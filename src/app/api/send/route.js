import { NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'
import { render } from '@react-email/render'
import { Default } from '@/emails'

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST() {
  try {
    const emailHtml = render(<Default />)

    const mail = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: 'tomfadial@gmail.com',
      replyTo: process.env.EMAIL_USERNAME,
      subject: 'Test',
      html: emailHtml,
    })

    return NextResponse.json({ message: 'Success: email was sent' })
  } catch (error) {
    console.log(error)
    NextResponse.status(500).json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
