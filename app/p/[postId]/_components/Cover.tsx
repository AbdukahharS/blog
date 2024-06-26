'use client'

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { Image as Img, Replace, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'

import { useUser } from '@/hooks/use-user'
import { useCreatePost } from '@/hooks/use-posts'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/Spinner'

interface CoverProps {
  cover: { url: string; name: string } | null
}

const Cover = ({ cover }: CoverProps) => {
  const { isAdmin } = useUser()
  const { updatePost, loading } = useCreatePost()
  const { postId } = useParams()

  const [coverState, setCoverState] = useState(cover)

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const newCover = await updatePost(postId as string, {
      banner: { newFile: file },
    })

    setCoverState(newCover)
  }

  const onRemove = async () => {
    await updatePost(postId as string, {
      banner: { oldFile: coverState?.name, newFile: null },
    })

    setCoverState(null)
  }

  const onReplace = async () => {}

  if (!coverState && !isAdmin) return null

  return (
    <div className='relative w-full h-[25vh] sm:h-[40vh] max-w-[1200px] mx-auto mt-4 rounded-3xl dark:bg-gray-800 bg-gray-200'>
      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <Spinner size='xl' />
        </div>
      ) : !!coverState?.url ? (
        <>
          <Image
            src={coverState.url}
            alt='Banner image'
            fill
            className='object-cover rounded-xl md:rounded-3xl'
            loading='lazy'
          />
          <div className='absolute bottom-4 right-4 gap-4 flex'>
            <input
              type='file'
              id='replaceFile'
              hidden
              accept='image/*'
              onChange={onChange}
            />

            <Button variant='secondary' asChild>
              <label htmlFor='replaceFile' className='cursor-pointer'>
                <Replace />
                Replace
              </label>
            </Button>
            <Button onClick={onRemove} variant='destructive'>
              <Trash2 />
              Remove
            </Button>
          </div>
        </>
      ) : (
        isAdmin && (
          <>
            <input
              type='file'
              id='coverFile'
              hidden
              accept='image/*'
              onChange={onChange}
            />
            <label
              htmlFor='coverFile'
              className='h-full flex items-center justify-center cursor-pointer text-lg'
            >
              <Img className='mr-4 h-10 w-10' />
              Upload Cover
            </label>
          </>
        )
      )}
    </div>
  )
}

export default Cover
