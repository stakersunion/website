import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import { EmailBasic } from '@/emails'
import { transporter } from '@/utils/email'

export async function POST(req) {
  try {
    const body = await req.json()

    const basicHTML = render(
      <EmailBasic
        name={body.name}
        title={body.title}
        content={body.content}
        buttonText={body.buttonText}
        href={body.href}
      />
    )

    const mail = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: body.email,
      replyTo: process.env.EMAIL_USERNAME,
      subject: body.subject || body.title,
      html: basicHTML,
    })

    return NextResponse.json({ message: 'Success: email was sent' })
  } catch (error) {
    console.log(error)
    NextResponse.status(500).json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
