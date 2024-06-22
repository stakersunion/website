import { Tailwind, Font, Html, Body, Section, Container, Img } from '@react-email/components'
import * as React from 'react'

const EmailLayout = ({ children }) => {
  return (
    <Html>
      <Font
        fontFamily={'Inter'}
        fallbackFontFamily={'Arial'}
        webFont={{
          url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle={'normal'}
      />
      <Tailwind>
        <Body className={'bg-black'}>
          <Section className={'bg-black'}>
            <Img
              src={'https://stakersunion.com/logo.png'}
              alt={'Stakers Union Logo'}
              width={'150'}
              height={'150'}
              className={'mx-auto'}
            />
          </Section>
          <Container className={'bg-white rounded px-12 py-8'}>{children}</Container>
          <Section className={'h-12'} />
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailLayout
