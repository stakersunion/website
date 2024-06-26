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
      return NextResponse.json({ error: 'User not yet created' }, { status: 404 })
    }
    return NextResponse.json(user.verification, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req) {
  const { id } = await currentUser()
  const body = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOneAndUpdate(
      { id },
      {
        $set: {
          'verification.eligibility.signature': body.signature,
          'verification.independent.schedule': body.schedule,
          'verification.residential.photo': body.photo,
          ...(body.signature && { 'verification.eligibility.status': 'pending' }),
          ...(body.schedule && { 'verification.independent.status': 'pending' }),
          ...(body.photo && { 'verification.residential.status': 'pending' }),
        },
      },
      { new: true }
    )
    return NextResponse.json(user, { status: 200 })
  }
}
