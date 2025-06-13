import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Definir rutas públicas (accesibles sin autenticación)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
])

// Definir rutas que requieren autenticación básica
const isProtectedRoute = createRouteMatcher([
  '/about',
  '/contact',
  '/services',
  '/blog'
])

// Definir rutas que requieren permisos de administrador
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/management(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  // Si es una ruta pública, permitir acceso
  if (isPublicRoute(req)) {
    return
  }

  // Proteger rutas de administrador con permisos específicos
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ permission: 'org:admin:example1' }) || has({ permission: 'org:admin:example2' })
    })
    return
  }

  // Proteger rutas generales que requieren autenticación
  if (isProtectedRoute(req)) {
    await auth.protect()
    return
  }

  // Por defecto, proteger todas las demás rutas
  await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}