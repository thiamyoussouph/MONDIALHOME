import { NextResponse, NextRequest } from 'next/server'

const PUBLIC = ['/maintenance','/favicon.ico','/robots.txt','/sitemap.xml','/_next','/images','/assets']

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const { pathname, searchParams } = url

  // Laisser passer assets & page maintenance
  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next()

  // Actif sur Vercel (prod ET preview). Inactif en local.
  const runningOnVercel = process.env.VERCEL === '1'
  const raw = (process.env.MAINTENANCE_MODE || '').trim().toLowerCase()
  const maintenanceOn = runningOnVercel && raw === 'on'

  // Bypass admin (clé -> cookie 6h)
  const secret = (process.env.MAINTENANCE_KEY || '').trim()
  const key = searchParams.get('key')
  if (secret && key === secret) {
    const res = NextResponse.next()
    res.cookies.set('MAINT_OK', '1', { path: '/', httpOnly: true, maxAge: 60 * 60 * 6 })
    return res
  }
  if (req.cookies.get('MAINT_OK')?.value === '1') return NextResponse.next()

  if (!maintenanceOn) return NextResponse.next()

  // Réécrit vers /maintenance
  const to = url.clone(); to.pathname = '/maintenance'; to.search = ''
  return NextResponse.rewrite(to, { status: 503 })
}

// Bloque tout (y compris /api). Si tu veux laisser /api, remplace par: { matcher: ['/((?!api).*)'] }
export const config = { matcher: ['/(.*)'] }
