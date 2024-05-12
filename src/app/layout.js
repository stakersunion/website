import '@/app/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/app/providers'
import { Inter as FontSans } from 'next/font/google'
import { Header } from '@/components'
import { cn } from '@/utils/shadcn'

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
            <Header />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}
