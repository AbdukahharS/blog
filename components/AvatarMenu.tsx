'use client'

import { signOutWithGoogle } from '@/lib/firebase/auth'
import { useUser } from '@/hooks/use-user'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Settings } from 'lucide-react'
import { toast } from './ui/use-toast'

export const AvatarMenu = () => {
  const { user } = useUser()

  const handleSignOut = async () => {
    await signOutWithGoogle()
  }

  const handleSettings = () => {
    toast({
      title: 'Coming soon...',
      description: 'I am working on it :)',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer w-8 h-8'>
          <AvatarImage src={user?.photoURL || ''} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-80'
        align='end'
        alignOffset={8}
        forceMount
      >
        <DropdownMenuLabel>
          <div className='flex w-full justify-start gap-4 items-center'>
            <Avatar className='w-8 h-8'>
              <AvatarImage src={user?.photoURL || ''} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col w-full min-w-0'>
              <span className='font-semibold truncate'>
                {user?.displayName}
              </span>
              <span className='font-medium truncate'>{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className='w-4 h-4 mr-2' />
          <span>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <Settings className='w-4 h-4 mr-2' />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
