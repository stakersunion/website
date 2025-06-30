import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const body = await req.json()

  console.log(body)
  return NextResponse.json({ message: 'Hello, world!' }, { status: 200 })
}
