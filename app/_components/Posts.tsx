'use client'

import { usePostsStore } from '@/hooks/use-posts'
import PostCard from './PostCard'

export default function Posts() {
  const { posts, filter, loading } = usePostsStore()

  return (
    <div className='bg-violet-200 mt-10 rounded-t-[50px] flex justify-center'>
      <div className='p-10 max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {loading ? (
          <>
            <PostCard.Skeleton />
            <PostCard.Skeleton />
          </>
        ) : (
          posts.map((post, i) => {
            if (filter === 'all' || filter === post.type) {
              return <PostCard key={post.id + i} post={post} i={i} />
            }
          })
        )}
      </div>
    </div>
  )
}
