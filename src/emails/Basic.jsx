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
        style={{ margin: '0.5rem 0', letterSpacing: '-0.015625rem' }}
      >
        {title}
      </Heading>
      {name && <Text>Hello {name},</Text>}
      {content.split('\n').map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
      {href && <Button href={href}>{buttonText}</Button>}
    </EmailLayout>
  )
}

export default EmailBasic
