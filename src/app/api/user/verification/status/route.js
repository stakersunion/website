import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

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
          'verification.eligibility.status': body.eligibility,
          'verification.independent.status': body.independent,
          'verification.residential.status': body.residential,
        },
      },
      { new: true }
    )
    return NextResponse.json(user, { status: 200 })
  }
}
