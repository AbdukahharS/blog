import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

import Header from '@/components/Header' // added
import CustomCursor from '@/components/CursorFollower/CustomCursor'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
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
