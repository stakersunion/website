import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import csv from 'csv-parser'
import * as cheerio from 'cheerio'
import axios from 'axios'

export const dynamic = 'force-dynamic'

// In-memory cache for CSV data
let soloStakersCache = null
let rocketpoolStakersCache = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function loadCsvIntoSet(filePath) {
  return new Promise((resolve, reject) => {
    const addressSet = new Set()
    const isSingleColumn = path.basename(filePath).includes('Solo-Stakers-A')

    fs.createReadStream(filePath)
      .pipe(csv({ separator: isSingleColumn ? ',' : '\t' }))
      .on('data', (row) => {
        if (isSingleColumn) {
          const address = Object.values(row)[0].toLowerCase().trim()
          addressSet.add(address)
        } else {
          const nodeAccount = row['Node Account'] ? row['Node Account'].toLowerCase().trim() : ''
          const withdrawalAddress = row['Withdrawal Address']
            ? row['Withdrawal Address'].toLowerCase().trim()
            : ''
          if (nodeAccount) addressSet.add(nodeAccount)
          if (withdrawalAddress) addressSet.add(withdrawalAddress)
        }
      })
      .on('end', () => resolve(addressSet))
      .on('error', reject)
  })
}

async function ensureCache() {
  const now = Date.now()
  
  // Check if cache is valid
  if (cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return
  }

  try {
    const csvPath1 = path.join(process.cwd(), 'src/data/Solo-Stakers-A.csv')
    const csvPath2 = path.join(process.cwd(), 'src/data/Rocketpool-Solo-Stakers.csv')

    // Load both CSV files in parallel
    const [soloStakers, rocketpoolStakers] = await Promise.all([
      loadCsvIntoSet(csvPath1),
      loadCsvIntoSet(csvPath2)
    ])

    soloStakersCache = soloStakers
    rocketpoolStakersCache = rocketpoolStakers
    cacheTimestamp = now
  } catch (error) {
    console.error('Error loading CSV cache:', error)
    throw error
  }
}

async function checkAddressInCache(address) {
  await ensureCache()
  
  const targetAddress = address.toLowerCase().trim()
  
  const existsInSolo = soloStakersCache.has(targetAddress)
  const existsInRocketpool = rocketpoolStakersCache.has(targetAddress)
  
  return { existsInSolo, existsInRocketpool }
}

export async function PUT(req) {
  const { id } = await currentUser()
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

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    await connect()
    const { address, oath } = await fetchSignature(signature)
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 400 })
    }

    if (!oath || !oath.includes('Night gathers, and now my stake begins')) {
      return NextResponse.json({ error: 'Invalid Oath' }, { status: 400 })
    }

    // Store the address associated with the signature
    user.addresses.push({
      address,
      type: 'eligibility',
    })
    await user.save()

    // Use cached lookup instead of streaming CSV files
    const { existsInSolo, existsInRocketpool } = await checkAddressInCache(address)

    if (!existsInSolo && !existsInRocketpool) {
      user.verification.eligibility.status = 'rejected'
      await user.save()
      return NextResponse.json(
        { error: 'Address not found in StakeCat List A or RocketPool' },
        { status: 400 }
      )
    }

    user.verification.eligibility.status = 'approved'
    await user.save()

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('Error verifying eligibility:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
