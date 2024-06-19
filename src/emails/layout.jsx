import { Tailwind, Font, Html, Body, Section, Img } from '@react-email/components'
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
          <Section>
            <Img
              src={'https://stakersunion.com/logo.png'}
              alt={'Stakers Union Logo'}
              width={'150'}
              height={'150'}
              className={'mx-auto'}
              />
          </Section>
          {children}
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailLayout
