// middleware.ts (DEBUG)
import { NextResponse, NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/maintenance','/favicon.ico','/robots.txt','/sitemap.xml','/_next','/images','/assets']

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const { pathname, searchParams } = url

  // Vars & flags
  const host = req.headers.get('host') || ''
  const nodeEnv = process.env.NODE_ENV || ''
  const vercelEnv = process.env.VERCEL_ENV || ''      // 'production' | 'preview' | 'development'
  const vercel = process.env.VERCEL || ''             // '1' sur Vercel
  const raw = (process.env.MAINTENANCE_MODE || '').trim().toLowerCase()
  const isProd = nodeEnv === 'production' || vercel === '1'
  const isPreview = vercelEnv === 'preview'
  const maintenanceOn = isProd && raw === 'on' && !isPreview

  // Réponse utilitaire pour ajouter des headers debug
  const withDebug = (res: NextResponse, tag: string) => {
    res.headers.set('x-host', host)
    res.headers.set('x-node', nodeEnv)
    res.headers.set('x-vercel-env', vercelEnv)
    res.headers.set('x-maint-raw', raw)
    res.headers.set('x-maint', maintenanceOn ? 'on' : 'off')
    res.headers.set('x-tag', tag) // où on est passé
    return res
  }

  // Laisse passer assets & /maintenance
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return withDebug(NextResponse.next(), 'assets')
  }

  // Bypass admin ?key=SECRET → cookie 6h
  const secret = (process.env.MAINTENANCE_KEY || '').trim()
  const key = searchParams.get('key')
  if (secret && key === secret) {
    const res = NextResponse.next()
    res.cookies.set('MAINT_OK', '1', { path: '/', httpOnly: true, maxAge: 60 * 60 * 6 })
    return withDebug(res, 'bypass-set')
  }
  if (req.cookies.get('MAINT_OK')?.value === '1') {
    return withDebug(NextResponse.next(), 'bypass-cookie')
  }

  // Si maintenance OFF → laisse passer
  if (!maintenanceOn) {
    return withDebug(NextResponse.next(), 'pass')
  }

  // Maintenance ON → rewrite
  const to = url.clone()
  to.pathname = '/maintenance'
  to.search = ''
  const res = NextResponse.rewrite(to, { status: 503 })
  res.headers.set('Cache-Control', 'no-store')
  return withDebug(res, 'rewrite')
}

export const config = { matcher: ['/((?!api).*)'] }
