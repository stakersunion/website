import { Font, Html, Body, Section, Container, Img } from '@react-email/components'
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
      <Body style={{ backgroundColor: 'black' }}>
        <Section style={{ backgroundColor: 'black' }}>
          <Img
            src={'https://stakersunion.com/logo.png'}
            alt={'Stakers Union Logo'}
            width={'150'}
            height={'150'}
            style={{ margin: '0 auto' }}
          />
        </Section>
        <Container
          style={{ backgroundColor: 'white', borderRadius: '0.25rem', padding: '2rem 3rem' }}
        >
          {children}
        </Container>
        <Section style={{ height: '3rem' }} />
      </Body>
    </Html>
  )
}

export default EmailLayout
