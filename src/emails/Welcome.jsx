import { EmailLayout } from '@/emails'
import { Container, Heading, Text } from '@react-email/components'

const WelcomeEmail = ({ name }) => {
  return (
    <EmailLayout>
      <Container>
        <Heading as={'h1'}>Welcome to the Stakers Union</Heading>
        <Text>Thanks for joining!</Text>
      </Container>
    </EmailLayout>
  )
}

export default WelcomeEmail
