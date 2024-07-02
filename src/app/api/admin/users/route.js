import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const users = await clerkClient.users.getUserList()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
