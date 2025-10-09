// middleware.ts (TEST FORCE MAINTENANCE)
import { NextResponse, NextRequest } from 'next/server'

// Laisse passer les assets essentiels
const PUBLIC_PATHS = [
  '/maintenance',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/_next', '/images', '/assets'
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    const pass = NextResponse.next()
    pass.headers.set('x-maint', 'assets')
    return pass
  }

  // ⚠️ FORCÉ: réécrit TOUT vers /maintenance
  const to = req.nextUrl.clone()
  to.pathname = '/maintenance'
  to.search = ''
  const res = NextResponse.rewrite(to, { status: 503 })
  res.headers.set('x-maint', 'force')
  res.headers.set('Cache-Control', 'no-store')
  return res
}

export const config = { matcher: ['/((?!api).*)'] }
