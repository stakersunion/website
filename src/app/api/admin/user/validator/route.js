import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const publicKey = searchParams.get('publicKey')

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    // Find any validator with the provided public key, searching through all user addresses
    const validator = user.addresses.reduce((acc, addr) => {
      const val = addr.validators.find((val) => val.publicKey === publicKey)
      return val || acc
    }, null)

    if (!validator) {
      return NextResponse.json({ error: 'Validator not found' }, { status: 404 })
    }

    return NextResponse.json(validator, { status: 200 })
  }
}

export async function POST(req) {
  const { id, address, validator } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })
    const validators = user.addresses.find((addr) => addr.address === address).validators
    const existingValidator = validators.find((val) => val.publicKey === validator.publicKey)

    if (existingValidator) {
      return NextResponse.json({ error: 'Validator already exists' }, { status: 400 })
    } else {
      validators.push(validator)
      await user.save()
      return NextResponse.json(validator, { status: 200 })
    }
  }
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const address = searchParams.get('address')
  const publicKey = searchParams.get('publicKey')

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })

    const addressIndex = user.addresses.findIndex((addr) => addr.address === address)
    if (addressIndex === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    const validatorIndex = user.addresses[addressIndex].validators.findIndex(
      (val) => val.publicKey === publicKey
    )
    if (validatorIndex === -1) {
      return NextResponse.json({ error: 'Validator not found' }, { status: 404 })
    }

    user.addresses[addressIndex].validators.splice(validatorIndex, 1)
    await user.save()
    return NextResponse.json({ message: 'Validator deleted' }, { status: 200 })
  }
}
