import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const address = searchParams.get('address')

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })
    const validators = user.addresses.find((addr) => addr.address === address)?.validators
    if (validators) {
      return NextResponse.json(validators, { status: 200 })
    } else {
      return NextResponse.json({ error: 'No validators found' }, { status: 404 })
    }
  }
}

export async function POST(req) {
  const { id, address, validators } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressExists = user.addresses.some((addr) => addr.address === address)
    if (!addressExists) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    for (const validator of validators) {
      const validatorExists = user.addresses
        .find((addr) => addr.address === address)
        .validators.some((val) => val.index === validator.index)
      if (validatorExists) {
        return NextResponse.json({ error: `One of the validators already exists: ${validator.index}` }, { status: 400 })
      } else {
        user.addresses.find((addr) => addr.address === address).validators.push(validator)
      }
    }

    await user.save()

    return NextResponse.json(user.addresses, { status: 200 })
  }
}
