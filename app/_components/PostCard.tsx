'use client'

import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import { Dot } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Post, usePostsStore } from '@/hooks/use-posts'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function PostCard({ post, i }: { post: Post; i: number }) {
  const { setFilter } = usePostsStore()
  return (
    <div className='relative h-[500px] lg:first:col-span-2 rounded-3xl bg-transparent hover:shadow-lg transition'>
      <Link href={`/posts/${post.id}`}>
        <Image
          alt='Banner image'
          src='https://cdn.neowin.com/news/images/uploaded/2023/06/1686923675_dev-home-wallpapers.jpg'
          fill
          objectFit='cover'
          className='rounded-3xl z-0 border-slate-400 border-[1px]'
        />
        <div className='z-10 absolute left-5 bottom-5 max-w-[calc(100%-40px)]'>
          {i === 0 && (
            <div className='px-4 relative pt-3 pb-1 rounded-t-3xl bg-secondary w-fit after:absolute after:right-0 after:h-1/2 after:bg-transparent after:block after:w-4 after:bottom-0 after:translate-x-4 after:translate-y-[10px] after:rounded-es-3xl after:border-b-[10px] after:border-l-[10px] after:border-accent after:box-content'>
              <Badge>Latest</Badge>
            </div>
          )}
          <div
            className={cn(
              'px-4 py-3 bg-secondary rounded-3xl min-w-40',
              i === 0 ? 'rounded-l-none' : 'rounded-es-none'
            )}
          >
            <p className='text-2xl font-semibold mt-2'>{post.title}</p>
            <p className='text-current opacity-80 mt-3 line-clamp-3'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
              aliquam recusandae necessitatibus culpa nisi a temporibus ut
              architecto velit harum?
            </p>
          </div>
          <div className='px-4 relative pb-3 pt-1 bg-secondary rounded-b-3xl w-fit flex items-center max-w-[calc(100%-40px)] after:absolute after:right-0 after:h-1/2 after:bg-transparent after:block after:w-4 after:top-0 after:translate-x-4 after:translate-y-[-10px] after:rounded-ss-3xl after:border-t-[10px] after:border-l-[10px] after:border-accent after:box-content'>
            <Button
              onClick={() => setFilter(post.type)}
              variant='outline'
              className='rounded-xl'
            >
              {post.type}
            </Button>
            <span className='ml-3 text-sm'>
              {format(post.createdAt.toDate(), 'dd MMM yyyy')}
            </span>
            <Dot />
            <span className='text-sm'>{post.readTime || 0} min read</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

PostCard.Skeleton = function PostCardSkeleton() {
  return (
    <Skeleton className='relative h-[500px] lg:first:col-span-2 rounded-3xl bg-slate-400'>
      <div className='z-10 absolute left-5 bottom-5 w-[calc(100%-40px)]'>
        <div className='px-4 py-3 bg-secondary rounded-3xl rounded-es-none h-32 w-full' />
        <div className='px-4 relative pb-3 pt-1 bg-secondary rounded-b-3xl w-52 h-10 flex items-center max-w-[calc(100%-40px)] after:absolute after:right-0 after:h-1/3 after:bg-transparent after:block after:w-4 after:top-0 after:translate-x-4 after:translate-y-[-10px] after:rounded-ss-3xl after:border-t-[10px] after:border-l-[10px] after:border-accent after:box-content' />
      </div>
    </Skeleton>
  )
}
