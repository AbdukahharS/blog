'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'

import { useGetPost } from '@/hooks/use-posts'
import { useUser } from '@/hooks/use-user'
import { Spinner } from '@/components/Spinner'
import { Separator } from '@/components/ui/separator'
import { Dot } from 'lucide-react'
import Editor from './_components/Editor'

const page = () => {
  const { postId } = useParams()
  const { isAdmin } = useUser()
  const { post, loading } = useGetPost(postId as string)

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <Spinner size='xl' />
      </div>
    )

  return (
    <div className='lg:max-w-7xl mx-auto py-4 px-6 lg:px-10'>
      <div className='relative w-full h-[25vh] sm:h-[40vh] max-w-[1200px] mx-auto mt-4'>
        <Image
          src={post.banner}
          alt='Banner image'
          fill
          className='object-cover rounded-t-xl md:rounded-t-3xl'
          loading='lazy'
        />
      </div>
      <h1 className='text-4xl md:text-5xl font-bold m-4 md:m-6'>
        {post.title}
      </h1>
      <h3 className='mt-3 text-md/6 md:text-xl/6 max-w-[800px] font-semibold opacity-80'>
        {post.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nemo incidunt mollitia illum facere perspiciatis sequi laudantium rerum voluptatum quas!'}
      </h3>
      <Separator className='my-6' />
      <div className='flex justify-end gap-2 md:gap-3 items-center opacity-70 mb-6'>
        <span>{post.readTime || 0} min read</span>
        <Dot className='text-primary w-6 h-6' />
        <span>Published: {format(post.createdAt.toDate(), 'dd MMM yyyy')}</span>
      </div>
      <Editor initialContent={post.content} editable={isAdmin} />
    </div>
  )
}

export default page
