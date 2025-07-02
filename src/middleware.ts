// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const cookie = req.cookies.get('order')?.value

  // if (!cookie && pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  if (cookie && pathname === '/login') {
    const user = JSON.parse(cookie)
    if (user.role === 'client') return NextResponse.redirect(new URL('/client', req.url))
    if (user.role === 'courier') return NextResponse.redirect(new URL('/courier', req.url))
    if (user.role === 'admin') return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}
