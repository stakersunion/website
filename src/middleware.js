import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routes } from '@/utils/routes'

const isUserRoute = createRouteMatcher(['/account(.*)', '/apply/(.+)'])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

const isAdminAPIRoute = createRouteMatcher(['/api/admin(.*)'])

const isCronRoute = createRouteMatcher(['/api/admin/send(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isCronRoute(req)) {
    return NextResponse.next()
  }

  if (isAdminRoute(req) || isAdminAPIRoute(req)) {
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
