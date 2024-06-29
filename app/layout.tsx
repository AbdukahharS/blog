import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import CustomCursor from '@/components/CursorFollower/CustomCursor'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shahzod Abdukahhar Blog',
  description:
    'Join Shahzod Abdukahhar as he delves into the world of web development. Explore in-depth articles, tutorials, and tips.',
  icons: {
    icon: {
      url: '/favicon.ico',
    },
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='blog-theme'
        >
          <div className='bg-background min-h-[100vh]'>
            <CustomCursor />
            <Header />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
