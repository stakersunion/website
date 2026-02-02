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
    // Build update object dynamically to avoid overwriting fields not in request
    const updateFields = {}
    if (body.name !== undefined) updateFields['profile.name'] = body.name
    if (body.email !== undefined) updateFields['profile.email'] = body.email
    if (body.discord !== undefined) updateFields['profile.discord'] = body.discord
    if (body.withdrawalAddress !== undefined) updateFields['profile.withdrawalAddress'] = body.withdrawalAddress
    if (body.clients !== undefined) updateFields['profile.clients'] = body.clients
    if (body.region !== undefined) updateFields['profile.region'] = body.region
    if (body.availability !== undefined) updateFields['profile.availability'] = body.availability

    const user = await User.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { new: true }
    )
    return NextResponse.json(user.profile, { status: 200 })
  }
}
