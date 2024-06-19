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
  const { user, loading } = useUser()

  const handleSignIn = async () => {
    await signInWithGoogle()
  }

  return (
    <header
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b, shadow-sm'
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
    </header>
  )
}

export default Header
