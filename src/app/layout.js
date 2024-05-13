import '@/app/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/app/providers'
import { Toaster } from '@/components/ui/sonner'
import NextTopLoader from 'nextjs-toploader'
import { Inter as FontSans } from 'next/font/google'
import { AccountMenu, Sidebar, Sheet } from '@/components/navigation'
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
            <NextTopLoader
              color={'#ffffff'}
              showSpinner={false}
            />
            <div className={'flex min-h-screen w-full flex-col bg-muted/20'}>
              <Sidebar />
              <div className={'flex flex-col sm:gap-4 sm:py-4 sm:pl-14'}>
                <header
                  className={
                    'sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'
                  }
                >
                  <div className={'relative ml-auto flex-1 md:grow-0'}>
                    <Sheet />
                  </div>
                  <AccountMenu />
                </header>
                <main>{children}</main>
                <Toaster />
              </div>
            </div>
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}
