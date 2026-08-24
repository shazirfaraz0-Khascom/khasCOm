import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Gate every /admin route before it renders.
 *
 * Checking the session inside the admin layout is not enough: React renders the
 * page in parallel with the layout, so a `redirect()` thrown by the layout still
 * ships the rendered admin HTML in the 307 response body. A browser follows the
 * redirect and never shows it, but `curl` — which does not follow by default —
 * receives every buyer email, phone number and supplier record in that body.
 *
 * Proxy (Middleware, renamed in Next.js 16) runs before rendering starts, so an
 * unauthenticated request is turned away with nothing rendered.
 */
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    const loginUrl = new URL('/admin-login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
