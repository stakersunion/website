import '@/app/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/app/providers'
import NextTopLoader from 'nextjs-toploader'
import { Inter as FontSans } from 'next/font/google'
import { Header } from '@/components'
import { cn } from '@/utils/shadcn'
config.autoAddCss = false

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Stakers Union Members',
  description: 'Membership Site for the Stakers Union',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <ClerkProvider>
        <html
          lang={'en'}
          suppressHydrationWarning
        >
          <head />
          <body
            className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}
          >
            <NextTopLoader color={'#ffffff'} showSpinner={false} />
            <Header />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}
