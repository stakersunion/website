import '@/app/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Providers from '@/app/providers'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/header'
import NextTopLoader from 'nextjs-toploader'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/utils/shadcn'
config.autoAddCss = false

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Stakers Union',
  description: 'The home-stakers collective',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html
        lang={'en'}
        suppressHydrationWarning
      >
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <NextTopLoader
            color={'#ffffff'}
            showSpinner={false}
          />
          <Header />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
