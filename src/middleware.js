import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routes } from '@/utils/routes'

const isUserRoute = createRouteMatcher(['/account(.*)'])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    const admin = auth().sessionClaims.metadata.role === 'admin'

    if (admin) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL(routes.account.path, req.url))
  }

  if (isUserRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
