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
    const { addresses } = await User.findOne({ id })
    return NextResponse.json(addresses, { status: 200 })
  }
}

export async function POST(req) {
  const { id, address, type } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressExists = user.addresses.some((addr) => addr.address === address)
    if (addressExists) {
      return NextResponse.json({ error: 'Address already exists' }, { status: 400 })
    }

    user.addresses.push({ address, type })
    await user.save()

    return NextResponse.json(user.addresses, { status: 200 })
  }
}
