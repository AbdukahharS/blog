'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { signInWithGoogle, signOutWithGoogle } from '@/lib/firebase/auth'
import { useUser } from '@/hooks/use-user'

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/Spinner'

export function Header() {
  const scrolled = useScrollTop()
  const { user, loading } = useUser()

  const handleSignIn = async () => {
    await signInWithGoogle()
  }

  const handleSignOut = async () => {
    await signOutWithGoogle()
  }

  return (
    <header>
      <div
        className={cn(
          'z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6',
          scrolled && 'border-b, shadow-sm'
        )}
      >
        <Link href='/'>
          <Image
            src='/logo.png'
            width={182}
            height={40}
            alt='Logo'
            className='dark:hidden'
          />
          <Image
            src='/logo-dark.png'
            width={182}
            height={40}
            alt='Logo'
            className='hidden dark:block'
          />
        </Link>
        <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
          {loading && <Spinner />}
          {!user?.uid && !loading && (
            <>
              <Button variant='ghost' size='sm' onClick={handleSignIn}>
                Log in
              </Button>
            </>
          )}
          {user?.uid && !loading && (
            <>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/documents'>Enter LuminInk</Link>
              </Button>
              {/* <UserButton afterSignOutUrl='/' /> */}
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
