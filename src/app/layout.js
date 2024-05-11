import { Inter as FontSans } from 'next/font/google'
import '@/app/globals.css'
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
    <html
      lang={'en'}
      suppressHydrationWarning
    >
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        {children}
      </body>
    </html>
  )
}
