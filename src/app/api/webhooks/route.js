import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import { transporter } from '@/utils/email'

export async function POST(req) {
  await connect()

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Get payload and handle event types
  const { id } = evt.data
  const eventType = evt.type

  switch (eventType) {
    case 'user.created':
      const newUser = new User({
        id: id,
        profile: {
          address: evt.data.web3_wallets[0].web3_wallet,
        },
      })
      await newUser.save()

      const mail = await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_ADMIN,
        replyTo: process.env.EMAIL_USERNAME,
        subject: 'New user signed up',
        html: `<p>${id}</p>`,
      })

      return new NextResponse('User created', { status: 200 })
    case 'user.deleted':
      await User.findOneAndDelete({
        id: id,
      })
      return new NextResponse('User deleted', { status: 200 })
    default:
      return new NextResponse('User updated', { status: 200 })
  }
}
