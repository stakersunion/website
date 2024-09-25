import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export async function GET() {
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

    if (!user.profile.passportAddress) {
      return NextResponse.json({ error: 'Passport not found' }, { status: 404 })
    }

    return NextResponse.json(user.profile.passportAddress, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

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
    user.profile.passportAddress = address
    await user.save()

    return NextResponse.json({ passportAddress: address }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
