import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

// Get Completed Appeals
export async function GET() {
  try {
    await connect()
    const data = await User.find({
      'verification.eligibility.status': 'approved',
      'verification.independent.status': 'approved',
      'appeal.status': 'approved',
    }).select('profile.address profile.withdrawalAddress verification.independent.schedule')

    const users = data.map((user) => ({
      address: user.profile.address,
      withdrawalAddress: user.profile.withdrawalAddress,
      joined: user.verification.independent.schedule,
    }))

    const csvData = users
      .map((user) => `${user.address},${user.withdrawalAddress},${user.joined}`)
      .join('\n')

    const headers = {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=appeals.csv',
    }

    return new NextResponse(`address,withdrawal_address,joined_date\n${csvData}`, { headers })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
