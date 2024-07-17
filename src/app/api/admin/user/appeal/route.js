import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export async function PUT(req) {
  const body = await req.json()

  if (!body.id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOneAndUpdate(
      { id: body.id },
      {
        $set: {
          'appeal.status': body.status,
        },
      },
      { new: true }
    )
    return NextResponse.json(user, { status: 200 })
  }
}
