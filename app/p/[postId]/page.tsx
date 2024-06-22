'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Dot } from 'lucide-react'

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
    await updatePost(postId as string, { content })
    setChanged(false)
  }

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <Spinner size='xl' />
      </div>
    )

  return (
    <div className='lg:max-w-7xl mx-auto py-4 px-6 lg:px-10'>
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
          disabled={!changed}
          variant={changed ? 'default' : 'ghost'}
          className='text-md md:text-lg'
          onClick={handeSave}
        >
          {changed ? 'Save changes' : 'Up to date'}
        </Button>
        <div className='opacity-70 flex gap-2 md:gap-3'>
          <span>{post.readTime || 0} min read</span>
          <Dot className='text-primary w-6 h-6' />
          <span>
            Published: {format(post.createdAt.toDate(), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
      <Editor
        onChange={() => setChanged(true)}
        initialContent={post.content}
        editable={isAdmin}
        setContent={(content: string) => setContent(content)}
      />
    </div>
  )
}

export default Page
