import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams
  const { id } = await currentUser()
  const address = searchParams.get('address')
  console.log(req)

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    await connect()
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const addressIndex = user.addresses.findIndex((addr) => addr.address === address)

    if (addressIndex === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    user.addresses.splice(addressIndex, 1)
    await user.save()

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
