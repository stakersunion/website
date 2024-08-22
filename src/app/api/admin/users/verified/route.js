import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connect()
    const users = await User.find()
    const verifiedUsers = users.filter(
      (user) =>
        user.verification.eligibility.status === 'approved' &&
        user.verification.independent.status === 'approved'
    )
    return NextResponse.json(verifiedUsers, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
