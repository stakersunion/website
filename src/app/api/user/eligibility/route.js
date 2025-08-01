import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import StakeCat from '@/models/stakecat'
import * as cheerio from 'cheerio'
import axios from 'axios'

export const dynamic = 'force-dynamic'

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

  async function checkAddressInDatabase(targetAddress) {
    try {
      const targetAddressLower = targetAddress.toLowerCase().trim()
      const address = await StakeCat.findOne({ address: targetAddressLower })
      return !!address
    } catch (error) {
      console.error('Error checking address in database:', error)
      return false
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

    const addressExists = await checkAddressInDatabase(address)

    if (!addressExists) {
      user.verification.eligibility.status = 'rejected'
      await user.save()
      return NextResponse.json(
        { error: 'Address not found in eligible addresses database' },
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
