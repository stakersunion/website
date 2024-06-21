import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const { verification } = await User.findOne({ id })
    return NextResponse.json(verification, { status: 200 })
  }
}

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
          'verification.eligibility.status': body.eligibility.status,
          'verification.independent.status': body.independent.status,
          'verification.residential.status': body.residential.status,
        },
      },
      { new: true }
    )
    return NextResponse.json(user, { status: 200 })
  }
}
