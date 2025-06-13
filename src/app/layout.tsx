import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aplicación Multi-Página',
  description: 'Aplicación con múltiples páginas y layouts en Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
          
          {/* Si NO ha iniciado sesión, mostrar solo los botones */}
          <SignedOut>
            <div className="flex flex-col justify-center items-center h-screen text-center gap-4">
              <h1 className="text-2xl font-semibold">Bienvenido a Mi App</h1>
              <p className="text-gray-600 mb-4">Inicia sesión o regístrate para continuar</p>
              <div className="flex gap-4">
                <SignInButton mode="modal">
                  <button className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800">
                    Iniciar sesión
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-white text-indigo-700 border border-indigo-700 px-4 py-2 rounded hover:bg-indigo-100">
                    Registrarse
                  </button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>

          {/* Si ha iniciado sesión, mostrar la app completa */}
          <SignedIn>
            <header className="bg-indigo-700 text-white p-4 shadow-md">
              <nav className="max-w-5xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Mi App</h1>
                <div className="space-x-4 flex items-center">
                  <Link href="/" className="hover:text-indigo-200">Inicio</Link>
                  <Link href="/about" className="hover:text-indigo-200">Acerca</Link>
                  <Link href="/services" className="hover:text-indigo-200">Servicios</Link>
                  <Link href="/contact" className="hover:text-indigo-200">Contacto</Link>
                  <Link href="/blog" className="hover:text-indigo-200">Blog</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </nav>
            </header>

            <main className="max-w-5xl mx-auto p-6">{children}</main>

            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>&copy; 2025 Mi App. Todos los derechos reservados.</p>
            </footer>
          </SignedIn>

        </body>
      </html>
    </ClerkProvider>
  );
}
