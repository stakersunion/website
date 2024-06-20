import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export async function PUT(req) {
  const { id } = await currentUser()
  const body = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    await connect()
    const user = await User.findOne({ id })
    const address = user.addresses.some((address) => address.address === body.address)
    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 })
    } else {
      user.addresses = user.addresses.map((address) => {
        if (address.address === body.address) {
          return {
            ...address,
            schedule: body.schedule,
          }
        }
        return address
      })
      await user.save()
    }
    return NextResponse.json(user, { status: 200 })
  }
}
