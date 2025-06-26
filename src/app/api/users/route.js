import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

// Get Verified User Addresses
export async function GET() {
  try {
    await connect()
    const data = await User.find({
      'verification.eligibility.status': 'approved',
      'verification.independent.status': 'approved',
    }).select('addresses profile.withdrawalAddress verification.independent.schedule')

    const users = data.map((user) => ({
      address: user.addresses[0]?.address,
      withdrawalAddress: user.profile.withdrawalAddress,
      joined: user.verification.independent.schedule,
    }))
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
