import { NextResponse, NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/maintenance',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/_next',           // assets Next
  '/images', '/assets', '/public'
]

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const pathname = url.pathname

  // Laisse passer les assets/public
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // En Preview (vercel.app), on ne bloque pas pour que tu testes
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const maintenanceOn = process.env.MAINTENANCE_MODE === 'on' && !isPreview
  if (!maintenanceOn) return NextResponse.next()

  // Accès admin via ?key=TON_SECRET (on pose un cookie 6h)
  const secret = process.env.MAINTENANCE_KEY || ''
  const key = url.searchParams.get('key')
  if (secret && key === secret) {
    const res = NextResponse.next()
    res.cookies.set('MAINT_OK', '1', { path: '/', httpOnly: true, maxAge: 60 * 60 * 6 })
    return res
  }

  // Accès admin si cookie déjà présent
  if (req.cookies.get('MAINT_OK')?.value === '1') {
    return NextResponse.next()
  }

  // Réécriture vers /maintenance (503 = maintenance propre)
  const maintUrl = url.clone()
  maintUrl.pathname = '/maintenance'
  maintUrl.search = ''
  return NextResponse.rewrite(maintUrl, { status: 503 })
}

export const config = {
  // Laisse vivre /api (webhooks, etc.). Enlève api si tu veux tout bloquer.
  matcher: ['/((?!api).*)'],
}
