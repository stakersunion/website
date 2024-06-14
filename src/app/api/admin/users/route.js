import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function GET(req) {
  try {
    const users = await clerkClient.users.getUserList()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const { id, role } = await req.json()
    if (!id || !role) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    const updatedUser = await clerkClient.users.updateUser(id, {
      publicMetadata: { role }
    })

    return NextResponse.json({ message: 'User role updated', user: updatedUser }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 })
  }
}
