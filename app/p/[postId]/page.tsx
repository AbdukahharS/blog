'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Dot } from 'lucide-react'
import readingTime from 'reading-time'
import dynamic from 'next/dynamic'

import { useGetPost, useCreatePost } from '@/hooks/use-posts'
import { useUser } from '@/hooks/use-user'
import { Spinner } from '@/components/Spinner'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Cover from './_components/Cover'
import Toolbar from './_components/Toolbar'

const Editor = dynamic(() => import('./_components/Editor'), { ssr: false })

const Page = () => {
  const { postId } = useParams()
  const { isAdmin } = useUser()
  const { post, loading } = useGetPost(postId as string)
  const { loading: updateLoad, updatePost } = useCreatePost()

  const [changed, setChanged] = useState(false)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (isAdmin) {
      setChanged(false)
    }
    if (!loading) {
      setChanged(false)
    }
  }, [isAdmin, loading])

  const handeSave = async () => {
    const { minutes } = readingTime(content)

    await updatePost(postId as string, { content, readTime: Number(minutes) })
    post.readTime = Number(minutes)
    setChanged(false)
  }

  const togglePublish = async () => {
    await updatePost(postId as string, { isPublished: !post.isPublished })
    post.isPublished = !post.isPublished
  }

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <Spinner size='xl' />
      </div>
    )

  return (
    <div className='lg:max-w-7xl mx-auto pt-4 pb-10 px-6 lg:px-10'>
      <Button onClick={togglePublish} className='text-md md:text-lg w-full'>
        {post.isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <Cover cover={post.banner} />
      <Toolbar initialData={post} postId={postId as string} />
      <Separator className='my-6' />
      <div
        className={cn(
          'flex justify-end items-center mb-6',
          isAdmin && 'justify-between'
        )}
      >
        {isAdmin && (
          <Button
            disabled={!changed || updateLoad}
            variant={changed && !updateLoad ? 'default' : 'ghost'}
            className='text-md md:text-lg'
            onClick={handeSave}
          >
            {updateLoad ? 'Saving...' : changed ? 'Save changes' : 'Up to date'}
          </Button>
        )}
        <div className='opacity-70 flex gap-2 md:gap-3'>
          <span>
            {post.readTime || 0} min{' '}
            <span className='hidden sm:inline'>read</span>
          </span>
          <Dot className='text-primary w-6 h-6' />
          <span>
            <span className='hidden sm:inline'>Written: </span>
            {format(post.createdAt.toDate(), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
      <Editor
        setChanged={setChanged}
        initialContent={post.content}
        editable={isAdmin && !updateLoad}
        setContent={setContent}
      />
    </div>
  )
}

export default Page
