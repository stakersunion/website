import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import Queue from '@/models/queue'
import { transporter } from '@/utils/email'
import { render } from '@react-email/render'
import { EmailBasic } from '@/emails'

export const dynamic = 'force-dynamic'

const limit = 80

export async function GET(req) {
  try {
    // get the bearer token from the header
    const authToken = (req.headers.get('authorization') || '').split('Bearer ').at(1)

    // if not found OR the bearer token does NOT equal the CRON_SECRET
    if (!authToken || authToken != process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Connect to MongoDB
    await connect()

    // 2. Fetch up to 10 "pending" emails ordered by their creation date
    const pendingEmails = await Queue.find({ status: 'pending' })
      .sort({ createdAt: 1 })
      .limit(limit)

    if (!pendingEmails.length) {
      return NextResponse.json({ message: 'No pending emails to send.' }, { status: 200 })
    }

    // 4. Send each email
    for (const item of pendingEmails) {
      try {
        const basicHTML = render(
          <EmailBasic
            name={item?.name}
            title={item.subject}
            content={item.body}
            buttonText={item.linkTitle}
            href={item.link}
          />
        )

        const mail = await transporter.sendMail({
          from: process.env.EMAIL_USERNAME,
          to: item.recipient,
          replyTo: process.env.EMAIL_USERNAME,
          subject: item.subject,
          html: basicHTML,
        })

        // Mark as sent
        item.status = 'sent'
        item.sentAt = new Date()
        await item.save()
      } catch (err) {
        console.error('Error sending email id=', item._id, err)
        item.status = 'failed'
        item.errorMessage = err.message || 'Unknown error'
        await item.save()
      }
    }

    // 5. Respond with how many were processed
    return NextResponse.json(
      {
        message: `Attempted to send ${pendingEmails.length} emails.`,
        count: pendingEmails.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Scheduled sendMail error:', error)
    return NextResponse.json(
      { error: 'Failed to send pending emails', details: error.message },
      { status: 500 }
    )
  }
}
