'use client'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { useUser } from '@/hooks/use-user'
import { usePosts } from '@/hooks/use-posts'

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/Spinner'
import { AvatarMenu } from '@/components/AvatarMenu'
import { Logo } from '@/components/Logo'

export function Header() {
  const scrolled = useScrollTop()
  const { user, loading } = useUser()
  usePosts()

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
            {!user?.uid && !loading && (
              <>
                <Button variant='ghost' size='sm' onClick={handleSignIn}>
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
