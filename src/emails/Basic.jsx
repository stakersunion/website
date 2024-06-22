import { EmailLayout } from '@/emails'
import { Heading, Text } from '@react-email/components'
import { Button } from '@/emails/components'

const EmailBasic = ({
  name,
  title = 'Basic Email',
  content = 'Lorem ipsum dolor sit amet',
  buttonText = 'Take Action',
  href = '#',
}) => {
  return (
    <EmailLayout>
      <Heading
        as={'h1'}
        className={'my-2 tracking-tight'}
      >
        {title}
      </Heading>
      {name && <Text>Hello {name},</Text>}
      <Text>{content}</Text>
      {href && <Button href={href}>{buttonText}</Button>}
    </EmailLayout>
  )
}

export default EmailBasic
