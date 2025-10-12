import { NextResponse, NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/maintenance',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/_next',
  '/images',
  '/assets',
]

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const { pathname, searchParams } = url

  // Laisse passer les assets et la page maintenance
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // ✅ Seulement en PRODUCTION (pas en local), et pas pour les PREVIEW
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const raw = (process.env.MAINTENANCE_MODE || '').trim().toLowerCase()
  const maintenanceOn = isProd && raw === 'on' && !isPreview

  // Bypass admin (clé -> cookie)
  const secret = (process.env.MAINTENANCE_KEY || '').trim()
  const key = searchParams.get('key')
  if (secret && key === secret) {
    const res = NextResponse.next()
    res.cookies.set('MAINT_OK', '1', { path: '/', httpOnly: true, maxAge: 60 * 60 * 6 })
    return res
  }
  if (req.cookies.get('MAINT_OK')?.value === '1') {
    return NextResponse.next()
  }

  if (!maintenanceOn) return NextResponse.next()

  // Réécrit vers /maintenance (503 = maintenance propre)
  const to = url.clone()
  to.pathname = '/maintenance'
  to.search = ''
  return NextResponse.rewrite(to, { status: 503 })
}

export const config = { matcher: ['/((?!api).*)'] }
