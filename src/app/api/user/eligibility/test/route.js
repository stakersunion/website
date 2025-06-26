import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import csv from 'csv-parser'
import * as cheerio from 'cheerio'
import axios from 'axios'

export const dynamic = 'force-dynamic'

export async function PUT(req) {
  const { signature } = await req.json()

  async function fetchSignature(signature) {
    try {
      const { data } = await axios.post(
        process.env.ZYTE_API_ENDPOINT,
        {
          url: signature,
          browserHtml: true,
        },
        {
          auth: { username: process.env.ZYTE_API_KEY },
        }
      )

      const $ = cheerio.load(data.browserHtml)

      const address = $('#ContentPlaceHolder1_txtAddressReadonly').attr('value')
      const oath = $('#ContentPlaceHolder1_txtSignedMessageReadonly').text()

      return { address, oath }
    } catch (error) {
      console.error('Error fetching signature:', error)
    }
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

    return NextResponse.json({
      address,
      valid: true,
    }, { status: 200 })
  } catch (error) {
    console.error('Error verifying eligibility:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
