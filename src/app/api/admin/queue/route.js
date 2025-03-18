import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import Queue from '@/models/queue'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connect()
    let queueItems = await Queue.find()

    return NextResponse.json(queueItems, { status: 200 })
  } catch (error) {
    console.error('Error fetching queue data:', error)
    return NextResponse.json({ error: 'Failed to fetch queue data' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connect()

    // Parse request body
    const body = await req.json()

    const { subject, message, link, linkTitle } = body
    if (!subject || !message || !link || !linkTitle) {
      return NextResponse.json({ error: 'News item incomplete.' }, { status: 400 })
    }

    // Fetch verified users
    const users = await User.find()
    const verifiedUsers = users.filter(
      (user) =>
        user.verification?.eligibility?.status === 'approved' &&
        user.verification?.independent?.status === 'approved'
    )

    // Build an array of queue docs
    const queueDocs = verifiedUsers.map((user) => ({
      name: user.profile.name,
      recipient: user.profile.email,
      subject: subject,
      body: message,
      link: link,
      linkTitle: linkTitle,
    }))

    // Insert these docs into the Queue collection
    const result = await Queue.insertMany(queueDocs)

    // Respond with success
    return NextResponse.json(
      { message: 'Emails successfully queued.', count: result.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error enqueuing emails:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    await connect()
    const searchParams = req.nextUrl.searchParams
    const ids = searchParams.getAll('ids[]')

    console.log(searchParams, ids)
    if (!ids.length) {
      return NextResponse.json({ error: 'No IDs provided.' }, { status: 400 })
    }
    await Queue.deleteMany({ _id: { $in: ids } })
    return NextResponse.json({ message: 'Queue items deleted successfully.' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting queue items:', error)
    return NextResponse.json({ error: 'Failed to delete queue items' }, { status: 500 })
  }
}
