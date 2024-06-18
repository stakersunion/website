import { Tailwind, Font, Html, Body } from '@react-email/components'
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
        <Body>{children}</Body>
      </Tailwind>
    </Html>
  )
}

export default EmailLayout
