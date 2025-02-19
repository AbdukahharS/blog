'use client'

import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import { Dot, Eye } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Post, usePostsStore } from '@/hooks/use-posts-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function PostCard({ post, i }: { post: Post; i: number }) {
  const { setFilter } = usePostsStore()

  const handleClick = (
    type: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    setFilter(type)
  }

  return (
    <div className='relative h-[500px] lg:first:col-span-2 rounded-3xl bg-transparent hover:shadow-lg transition'>
      <Link href={`/p/${post.id}`}>
        <Image
          alt='Banner image'
          src={
            post.banner
              ? post.banner.url
              : 'https://cdn.neowin.com/news/images/uploaded/2023/06/1686923675_dev-home-wallpapers.jpg'
          }
          fill
          className='rounded-3xl z-0 border-slate-400 border-[1px] object-cover'
          loading={i === 0 ? 'eager' : 'lazy'}
          priority={i === 0}
        />
        <div className='z-10 absolute left-2 bottom-2 sm:left-5 sm:bottom-5 max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-40px)]'>
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
              {post.description}
            </p>
          </div>
          <div className='px-4 relative pb-3 pt-1 bg-secondary rounded-b-3xl w-fit flex items-center max-w-[calc(100%-40px)] after:absolute after:right-0 after:h-1/2 after:bg-transparent after:block after:w-4 after:top-0 after:translate-x-4 after:translate-y-[-10px] after:rounded-ss-3xl after:border-t-[10px] after:border-l-[10px] after:border-accent after:box-content'>
            <Button
              onClick={(e) => handleClick(post.type, e)}
              variant='outline'
              className='hover:bg-background/30'
              size='sm'
            >
              {post.type}
            </Button>
            <span className='ml-3 text-sm hidden sm:inline'>
              {format(post.createdAt.toDate(), 'dd MMM yyyy')}
            </span>
            <span className='ml-3 text-sm inline sm:hidden'>
              {format(post.createdAt.toDate(), 'dd/mm/yy')}
            </span>
            <Dot />
            <div className='text-sm flex flex-row items-center gap-1'>
              <Eye size={16} />
              {post.views || 0}
            </div>
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
