import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

// Get Address
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const address = searchParams.get('address')

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressData = user.addresses.find((addr) => addr.address === address)

    if (!addressData) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    return NextResponse.json(addressData, { status: 200 })
  }
}

// Update Address
export async function PUT(req) {
  const { id, address, newAddress, newCategory, newType } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressData = user.addresses.find((addr) => addr.address === address)

    if (!addressData) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    addressData.address = newAddress || addressData.address
    addressData.category = newCategory || addressData.category
    addressData.type = newType || addressData.type

    await user.save()

    return NextResponse.json(addressData, { status: 200 })
  }
}

// Create Address
export async function POST(req) {
  const { id, address, category, type } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressExists = user.addresses.some((addr) => addr.address === address)
    if (addressExists) {
      return NextResponse.json({ error: 'Address already exists' }, { status: 400 })
    }

    user.addresses.push({ address, category, type })
    await user.save()

    return NextResponse.json(user.addresses, { status: 200 })
  }
}

// Delete Address
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const address = searchParams.get('address')

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressIndex = user.addresses.findIndex((addr) => addr.address === address)

    if (addressIndex === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    user.addresses.splice(addressIndex, 1)
    await user.save()

    return NextResponse.json(user.addresses, { status: 200 })
  }
}
