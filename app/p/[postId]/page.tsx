'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Dot } from 'lucide-react'
import readingTime from 'reading-time'

import { useGetPost, useCreatePost } from '@/hooks/use-posts'
import { useUser } from '@/hooks/use-user'
import { Spinner } from '@/components/Spinner'
import { Separator } from '@/components/ui/separator'
import Editor from './_components/Editor'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Page = () => {
  const { postId } = useParams()
  const { isAdmin } = useUser()
  const { post, loading } = useGetPost(postId as string)
  const { loading: updateLoad, updatePost } = useCreatePost()

  const [changed, setChanged] = useState(false)
  const [content, setContent] = useState<string>('')

  const handeSave = async () => {
    const { minutes } = readingTime(content)

    await updatePost(postId as string, { content, readTime: Number(minutes) })
    post.readTime = Number(minutes)
    setChanged(false)
  }

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <Spinner size='xl' />
      </div>
    )

  return (
    <div className='lg:max-w-7xl mx-auto pt-4 pb-10 px-6 lg:px-10'>
      {post?.banner && (
        <div className='relative w-full h-[25vh] sm:h-[40vh] max-w-[1200px] mx-auto mt-4'>
          <Image
            src={post.banner}
            alt='Banner image'
            fill
            className='object-cover rounded-xl md:rounded-3xl'
            loading='lazy'
          />
        </div>
      )}
      <h1 className='text-4xl md:text-5xl font-bold m-4 md:m-6'>
        {post.title}
      </h1>
      <h3 className='mt-3 text-md/6 md:text-xl/6 max-w-[800px] font-semibold opacity-80'>
        {post.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nemo incidunt mollitia illum facere perspiciatis sequi laudantium rerum voluptatum quas!'}
      </h3>
      <Separator className='my-6' />
      <div
        className={cn(
          'flex justify-end items-center mb-6',
          isAdmin && 'justify-between'
        )}
      >
        <Button
          disabled={!changed || updateLoad}
          variant={changed && !updateLoad ? 'default' : 'ghost'}
          className='text-md md:text-lg'
          onClick={handeSave}
        >
          {updateLoad ? 'Saving...' : changed ? 'Save changes' : 'Up to date'}
        </Button>
        <div className='opacity-70 flex gap-2 md:gap-3'>
          <span>{post.readTime || 0} min read</span>
          <Dot className='text-primary w-6 h-6' />
          <span>Written: {format(post.createdAt.toDate(), 'dd MMM yyyy')}</span>
        </div>
      </div>
      <Editor
        setChanged={setChanged}
        initialContent={post.content}
        editable={isAdmin}
        setContent={setContent}
      />
    </div>
  )
}

export default Page
