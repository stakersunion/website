import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import axios from 'axios'
import * as cheerio from 'cheerio'
import csv from 'csv-parser'

export async function PUT(req) {
  const { id } = await currentUser()
  const { signature } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const response = await axios.get(signature)

    const $ = cheerio.load(response.data)

    const address = $('#ContentPlaceHolder1_txtAddressReadonly').val()

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 400 })
    }

    const csvUrl =
      'https://raw.githubusercontent.com/Stake-Cat/Solo-Stakers/main/Solo-Stakers/Solo-Stakers-A.csv'
    const addressExists = await checkAddressInCsv(csvUrl, address)

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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

async function checkAddressInCsv(url, targetAddress) {
  return new Promise((resolve) => {
    let foundAddress = false
    let rowCount = 0
    const targetAddressLower = targetAddress.toLowerCase().trim()

    axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    })
      .then((response) => {
        response.data
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
      })
      .catch((error) => {
        resolve(false)
      })
  })
}
