'use client'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { useUser } from '@/hooks/use-user'

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/Spinner'
import { AvatarMenu } from '@/components/AvatarMenu'
import { Logo } from '@/components/Logo'

export function Header() {
  const scrolled = useScrollTop()
  const { user, loading, isAdmin } = useUser()

  const handleSignIn = async () => {
    await signInWithGoogle()
  }

  return (
    <>
      <div className='h-[92px]' />
      <header className='z-50 bg-background fixed top-0 w-full px-6'>
        <div
          className={cn(
            'py-6 flex items-center border-b-4 lg:max-w-7xl mx-auto',
            scrolled && ' shadow-sm'
          )}
        >
          <Logo />
          <div className='ml-auto justify-end w-full flex items-center gap-x-2'>
            {loading && <Spinner />}
            {isAdmin && !loading && (
              <Button variant='outline'>Create a post</Button>
            )}
            {!user?.uid && !loading && (
              <>
                <Button variant='outline' size='sm' onClick={handleSignIn}>
                  Log in
                </Button>
              </>
            )}
            {user?.uid && !loading && <AvatarMenu />}
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
