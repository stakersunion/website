import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import axios from 'axios'

export async function POST(req) {
  try {
    const { id } = (await currentUser()) || {}

    if (!id) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    await connect()
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { address } = await req.json()
    const response = await axios.post(
      'https://api.scorer.gitcoin.co/registry/submit-passport',
      {
        address: address,
        scorer_id: process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_SCORER_ID,
      },
      {
        headers: {
          'X-API-KEY': process.env.GITCOIN_PASSPORT_SCORER_API_KEY,
        },
      }
    )

    user.addresses.find((a) => a.address === address).passport = {
      score: response.data.score,
      expires: response.data.expiration_date,
      updated: new Date(),
    }

    await user.save()

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req) {
  const { id } = (await currentUser()) || {}

  if (!id) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
  }

  await connect()
  const user = await User.findOne({ id })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const searchParams = req.nextUrl.searchParams
  const address = searchParams.get('address')

  try {
    const response = await axios.get(
      `https://api.scorer.gitcoin.co/registry/score/${process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_SCORER_ID}/${address}`,
      {
        headers: {
          'X-API-KEY': process.env.GITCOIN_PASSPORT_SCORER_API_KEY,
        },
      }
    )

    // Check if address exists first
    if (!user.addresses.some((a) => a.address === address)) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }
    
    user.addresses.find((a) => a.address === address).passport = {
      score: response.data.score,
      expires: response.data.expiration_date,
      updated: new Date(),
    }

    await user.save()

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
