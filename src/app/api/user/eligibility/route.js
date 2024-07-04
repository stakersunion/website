const scrapingbee = require('scrapingbee')
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import csv from 'csv-parser'

export const dynamic = 'force-dynamic'

export async function PUT(req) {
  const { id } = await currentUser()
  const { signature } = await req.json()

  async function fetchAddress(signature) {
    const client = new scrapingbee.ScrapingBeeClient(process.env.SCRAPINGBEE_API_KEY)

    const response = await client.get({
      url: signature,
      params: {
        wait_for: '#ContentPlaceHolder1_txtAddressReadonly',
        extract_rules: {
          address: '#ContentPlaceHolder1_txtAddressReadonly@value',
        },
      },
    })

    var decoder = new TextDecoder()
    var extract = decoder.decode(response.data)
    var { address } = JSON.parse(extract)

    return address
  }

  async function checkAddressInCsv(path, targetAddress) {
    return new Promise((resolve) => {
      let foundAddress = false
      let rowCount = 0
      const targetAddressLower = targetAddress.toLowerCase().trim()

      fs.createReadStream(path)
        .pipe(csv())
        .on('data', (row) => {
          rowCount++
          const [key, value] = Object.entries(row)[0]

          if (
            key.toLowerCase().trim() === targetAddressLower ||
            value.toLowerCase().trim() === targetAddressLower
          ) {
            foundAddress = true
            resolve(true)
          }
        })
        .on('end', () => {
          if (!foundAddress) {
            resolve(false)
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error)
          resolve(false)
        })
    })
  }

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const address = await fetchAddress(signature)

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 400 })
    }

    const csvPath = path.join(process.cwd(), 'src/data/stake-cat-list-a.csv')
    console.log(csvPath)

    const addressExists = await checkAddressInCsv(csvPath, address)

    if (!addressExists) {
      return NextResponse.json({ error: 'Address not found in StakeCat List' }, { status: 400 })
    }

    await connect()
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    user.verification.eligibility.status = 'approved'
    await user.save()

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
