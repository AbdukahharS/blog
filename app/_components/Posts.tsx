'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { usePostsStore } from '@/hooks/use-posts-store'
import PostCard from './PostCard'

export default function Posts() {
  const { posts, filter, loading, search } = usePostsStore()
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    setFilteredPosts(posts)
    if (!!filter && filter !== 'all') {
      setFilteredPosts((posts) => posts.filter((post) => post.type === filter))
    }
    if (!!search) {
      const lowerCaseQuery = search.toLowerCase()
      setFilteredPosts((posts) =>
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.description.toLowerCase().includes(lowerCaseQuery)
        )
      )
    }
  }, [search, posts, filter])

  return (
    <div className='bg-foreground/70 dark:bg-accent mt-10 rounded-t-[50px] flex justify-center flex-1 items-center'>
      {!loading && filteredPosts.length === 0 ? (
        <div>
          <Image
            src='/no-items.svg'
            alt='No items'
            width={300}
            height={300}
            className='dark:hidden'
          />
          <Image
            src='/no-items-dark.svg'
            alt='No items'
            width={300}
            height={300}
            className='hidden dark:block'
          />
          <p className='text-center text-6xl font-semibold text-white dark:text-foreground/80'>
            No items
          </p>
        </div>
      ) : (
        <div className='py-10 px-4 md:px-10 max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {loading ? (
            <>
              <PostCard.Skeleton />
              <PostCard.Skeleton />
            </>
          ) : (
            filteredPosts.length > 0 &&
            filteredPosts.map((post, i) => (
              <PostCard key={post.id + i} post={post} i={i} />
            ))
          )}
        </div>
      )}
    </div>
  )
}
