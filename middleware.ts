import { NextResponse, type NextRequest } from 'next/server'

// Protect private routes by checking a cookie set on login
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isPublic = pathname === '/' // login
  const isAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.startsWith('/public')

  if (isPublic || isAsset) return NextResponse.next()

  // Read access token from cookie
  const accessToken = req.cookies.get('accessToken')?.value

  // List of protected prefixes (adjust as needed)
  const protectedPrefixes = ['/dashboard', '/inventario', '/personas', '/viviendas', '/reportes', '/calidad', '/auditoria', '/admin', '/eventos']
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p))

  if (isProtected && !accessToken) {
    const loginUrl = new URL('/', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
