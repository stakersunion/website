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
    const update = {}
    const setIfProvided = (key, value) => {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        update[`profile.${key}`] = value
      }
    }

    setIfProvided('name', body.name)
    setIfProvided('email', body.email)
    setIfProvided('discord', body.discord)
    setIfProvided('withdrawalAddress', body.withdrawalAddress)
    setIfProvided('clients', body.clients)
    setIfProvided('region', body.region)
    setIfProvided('availability', body.availability)
    setIfProvided('languages', body.languages)
    setIfProvided('preferredContact', body.preferredContact)
    setIfProvided('stack', body.stack)

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 })
    }

    const user = await User.findOneAndUpdate(
      { id },
      {
        $set: {
          ...update,
        },
      },
      { new: true }
    )
    return NextResponse.json(user.profile, { status: 200 })
  }
}
