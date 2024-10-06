import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import csv from 'csv-parser'
import { GeonodeScraperApi } from 'geonode-scraper-api'
import { parse } from 'node-html-parser'

export const dynamic = 'force-dynamic'

export async function PUT(req) {
  const { id } = await currentUser()
  const { signature } = await req.json()

  async function fetchSignature(signature) {
    const scraper = new GeonodeScraperApi(
      process.env.GEONODE_USERNAME,
      process.env.GEONODE_PASSWORD
    )

    const config = {
      js_render: false,
      response_format: 'html',
      block_resources: true,
      HTMLMinifier: { useMinifier: true },
    }

    const response = await scraper.scrape(signature, config)
    const root = parse(response.data)

    const address = root.querySelector('#ContentPlaceHolder1_txtAddressReadonly').attributes.value
    const oath = root.querySelector('#ContentPlaceHolder1_txtSignedMessageReadonly').innerText

    return { address, oath }
  }

  async function checkAddressInCsv(filePath, targetAddress) {
    return new Promise((resolve) => {
      let foundAddress = false
      const targetAddressLower = targetAddress.toLowerCase().trim()
      const isSingleColumn = path.basename(filePath).includes('Solo-Stakers-A')

      fs.createReadStream(filePath)
        .pipe(csv({ separator: isSingleColumn ? ',' : '\t' }))
        .on('data', (row) => {
          if (isSingleColumn) {
            const address = Object.values(row)[0].toLowerCase().trim()
            if (address === targetAddressLower) {
              foundAddress = true
              resolve(true)
            }
          } else {
            const nodeAccount = row['Node Account'] ? row['Node Account'].toLowerCase().trim() : ''
            const withdrawalAddress = row['Withdrawal Address']
              ? row['Withdrawal Address'].toLowerCase().trim()
              : ''
            if (nodeAccount === targetAddressLower || withdrawalAddress === targetAddressLower) {
              foundAddress = true
              resolve(true)
            }
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
    const { address, oath } = await fetchSignature(signature)

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 400 })
    }

    if (!oath || !oath.includes('Night gathers, and now my stake begins')) {
      return NextResponse.json({ error: 'Invalid Oath' }, { status: 400 })
    }

    const csvPath1 = path.join(process.cwd(), 'src/data/Solo-Stakers-A.csv')
    const csvPath2 = path.join(process.cwd(), 'src/data/Rocketpool-Solo-Stakers.csv')

    const addressExists1 = await checkAddressInCsv(csvPath1, address)
    const addressExists2 = await checkAddressInCsv(csvPath2, address)

    if (!addressExists1 && !addressExists2) {
      return NextResponse.json(
        { error: 'Address not found in StakeCat List A or RocketPool' },
        { status: 400 }
      )
    }

    await connect()
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    user.verification.eligibility.status = 'approved'
    user.addresses.push({ address })
    await user.save()

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
