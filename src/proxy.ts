import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Protege /admin: sin sesión → /admin/login. Con sesión en /admin/login → /admin.
 * También refresca el token de Supabase en cada request al panel.
 * Solo corre en /admin/* (ver matcher) — el sitio público no pasa por acá.
 */
export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Supabase sin configurar todavía — dejar pasar (el login mostrará el error)
  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // IMPORTANTE: getUser() valida el token contra Supabase y lo refresca.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const esLogin = request.nextUrl.pathname.startsWith('/admin/login')

  if (!user && !esLogin) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  if (user && esLogin) {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = '/admin'
    return NextResponse.redirect(adminUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
