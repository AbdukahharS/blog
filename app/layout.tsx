import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header' // added
import CustomCursor from '@/components/CursorFollower/CustomCursor'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shahzodb Abdukahhar Blog',
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
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='blog-theme'
        >
          <CustomCursor />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
