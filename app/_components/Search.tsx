'use client'

import { useEffect, useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePostsStore } from '@/hooks/use-posts'

export const Search = () => {
  const [focus, setFocus] = useState(false)
  const { setSearch, loading } = usePostsStore()

  return (
    <div className='w-full px-4 md:w-fit'>
      <h3 className='opacity-80'>SEARCH BLOG</h3>
      <div className='relative mt-2 w-full'>
        <Input
          disabled={loading}
          className='pl-9 w-full min-w-80 rounded-xl text-md'
          placeholder='I want to read about...'
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-80',
            focus && 'text-primary opacity-100'
          )}
        />
      </div>
    </div>
  )
}
