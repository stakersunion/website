import { EmailLayout } from '@/emails'
import { Container, Heading, Text, Section, Row, Column } from '@react-email/components'
import { Badge } from '@/emails/components'

const WelcomeEmail = ({ name }) => {
  return (
    <EmailLayout>
      <Container className={'bg-white rounded px-10 py-4'}>
        <Heading
          as={'h1'}
          className={'tracking-tight'}
        >
          Welcome to the Stakers Union
        </Heading>
        <Text>
          Thanks for applying to the Stakers Union. Take the next steps to complete your
          verification.
        </Text>
        <div className={'flex flex-1 items-center'}>
          <Badge>1</Badge>
          <Text className={'my-0 ml-2'}>
            Select a date/time from the options below to temporarily disable attestations:
          </Text>
        </div>
        <div className={'my-4 p-3 border-solid rounded'}>
            asdfasf
        </div>
      </Container>
    </EmailLayout>
  )
}

export default WelcomeEmail
