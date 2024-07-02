import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connect()
    const users = await User.find()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
