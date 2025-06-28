import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { id } = (await currentUser()) || {}

    if (!id) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    await connect()
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not yet created' }, { status: 404 })
    }

    return NextResponse.json(user.profile, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req) {
  const { id } = (await currentUser()) ?? {}
  const body = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOneAndUpdate(
      { id },
      {
        $set: {
          'profile.name': body.name,
          'profile.email': body.email,
          'profile.discord': body.discord,
          'profile.withdrawalAddress': body.withdrawalAddress,
          'profile.passportAddress': body.passportAddress,
          'profile.clients': body.clients,
          'profile.region': body.region,
        },
      },
      { new: true }
    )
    return NextResponse.json(user.profile, { status: 200 })
  }
}
