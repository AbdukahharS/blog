'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams, useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Dot, Eye, Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'

import { useGetPost, useCreatePost } from '@/hooks/use-posts'
import { useUser } from '@/hooks/use-user'
import { Spinner } from '@/components/Spinner'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Cover from './_components/Cover'
import Toolbar from './_components/Toolbar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'

const Editor = dynamic(() => import('./_components/Editor/Editor'), {
  ssr: false,
})

const Page = () => {
  const router = useRouter()
  const { postId } = useParams()
  const { isAdmin } = useUser()
  const { post, loading, notfound } = useGetPost(postId as string)
  const { loading: updateLoad, updatePost, deletePost } = useCreatePost()

  const [changed, setChanged] = useState(false)
  const [content, setContent] = useState<string>('')

  if (!loading && notfound) {
    console.log('not found')
    notFound()
  }

  useEffect(() => {
    if (isAdmin) {
      setChanged(false)
    }
    if (!loading) {
      setChanged(false)
    }
  }, [isAdmin, loading])

  useEffect(() => {
    const fun = async () => {
      const incrementedPosts = sessionStorage.getItem('views-incremented')
      if (!incrementedPosts) return await incrementViews()
      const incrementedArray = JSON.parse(incrementedPosts)
      if (!Array.isArray(incrementedArray)) return await incrementViews()
      const didIncrementViews = incrementedArray.find(
        (post: string) => post === (postId as string)
      )
      if (!didIncrementViews) {
        await incrementViews(incrementedArray)
      }
    }
    if (!loading && !post.isPublished) {
      fun()
    }
  }, [loading])

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear()
    }

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const incrementViews = async (array: string[] = []) => {
    const views = Number(post.views) ? post.views + 1 : 1
    console.log(post.views, views)
    await updatePost(postId as string, {
      views,
    })
    post.views = views

    sessionStorage.setItem(
      'views-incremented',
      JSON.stringify([...array, postId as string])
    )
  }

  const handeSave = async () => {
    await updatePost(postId as string, {
      content,
    })
    setChanged(false)
  }

  const togglePublish = async () => {
    await updatePost(postId as string, { isPublished: !post.isPublished })
    post.isPublished = !post.isPublished
  }

  const onDelete = async () => {
    await deletePost(postId as string)
    toast({ title: 'Post deleted' })
    router.push('/')
  }

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <Spinner size='xl' />
      </div>
    )

  return (
    <div className='lg:max-w-7xl mx-auto pt-4 pb-10 px-3 lg:px-10'>
      {isAdmin && (
        <div className='flex gap-4'>
          <Button onClick={togglePublish} className='text-md md:text-lg'>
            {post.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
          <Dialog>
            <Button
              asChild
              variant='destructive'
              className='text-md md:text-lg'
            >
              <DialogTrigger>
                <Trash2 className='w-5 h-5 mr-2' /> Delete
              </DialogTrigger>
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant='destructive'
                    onClick={onDelete}
                    className='text-md md:text-lg'
                  >
                    Delete anyway
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
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
          <div className='flex gap-2 flex-row items-center'>
            <Eye size={18} /> {post.views}
          </div>
          <Dot className='text-primary w-6 h-6' />
          <span>
            <span className='hidden sm:inline'>Written: </span>
            {post.createdAt && format(post.createdAt.toDate(), 'dd MMM yyyy')}
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
