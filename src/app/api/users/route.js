import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

// Get Verified User Count
export async function GET() {
  try {
    await connect()
    const count = await User.countDocuments({
      'verification.eligibility.status': 'approved',
      'verification.independent.status': 'approved',
    })
    return NextResponse.json({ count }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
