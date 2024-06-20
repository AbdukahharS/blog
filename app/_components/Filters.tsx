'use client'

import { Dot } from 'lucide-react'

import { Spinner } from '@/components/Spinner'
import { usePostsStore } from '@/hooks/use-posts'
import { cn } from '@/lib/utils'

export const Filters = () => {
  const { filterCount, filter, setFilter, loading } = usePostsStore()

  return (
    <div className='px-6 lg:px-12 mt-8 md:mt-0'>
      <h3>FILTERS</h3>
      <div className='flex gap-2 md:gap-4 mt-2 flex-wrap'>
        {Object.entries(filterCount).map(([key, value]) => (
          <div
            className={cn(
              'rounded-3xl flex items-center px-2 py-1 sm:px-4 sm:py-2 cursor-pointer text-sm sm:text-base',
              filter === key ? 'bg-primary' : 'bg-accent'
            )}
            onClick={() => setFilter(key)}
            key={key}
          >
            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()} <Dot />
            {loading ? <Spinner /> : value}
          </div>
        ))}
      </div>
    </div>
  )
}
