'use client'

import { ElementRef, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { useUser } from '@/hooks/use-user'
import { useCreatePost } from '@/hooks/use-posts'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ToolbarProps {
  initialData: {
    title: string
    description?: string
    type: string
  }
  postId: string
}

const Toolbar = ({ initialData, postId }: ToolbarProps) => {
  const titleRef = useRef<ElementRef<'textarea'>>(null)
  const descRef = useRef<ElementRef<'textarea'>>(null)

  const { isAdmin } = useUser()
  const { updatePost, loading } = useCreatePost()

  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isDescEditing, setIsDescEditing] = useState(false)
  const [title, setTitle] = useState(initialData.title)
  const [desc, setDesc] = useState(initialData.description || '')
  const [type, setType] = useState(initialData.type)

  const enableTitle = () => {
    if (!isAdmin) return

    setIsTitleEditing(true)
    setTimeout(() => {
      setTitle(initialData.title)
      titleRef.current?.focus()
    }, 0)
  }

  const disableTitle = async () => {
    if (!isAdmin) return

    await updatePost(postId, {
      title,
    })
    setIsTitleEditing(false)
  }

  const enableDesc = () => {
    if (!isAdmin) return

    setIsDescEditing(true)
    setTimeout(() => {
      setDesc(initialData.description || '')
      titleRef.current?.focus()
    }, 0)
  }

  const disableDesc = async () => {
    if (!isAdmin) return

    await updatePost(postId, {
      description: desc,
    })
    setIsDescEditing(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      disableTitle()
    }
  }

  const onKeyDownDesc = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      disableDesc()
    }
  }

  const handleTypeChange = async (type: string) => {
    await updatePost(postId, { type })
    setType(type)
  }

  return (
    <div className='pl-0 sm:pl-[54px] group relative'>
      {isTitleEditing && isAdmin ? (
        <TextareaAutosize
          ref={titleRef}
          onBlur={disableTitle}
          onKeyDown={onKeyDown}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='text-3xl sm:text-4xl md:text-5xl bg-transparent font-bold break-words outline-none resize-none m-4 md:m-6'
        />
      ) : (
        <h1
          onClick={enableTitle}
          className='text-3xl sm:text-4xl md:text-5xl font-bold m-4 md:m-6'
        >
          {title}
        </h1>
      )}
      {isDescEditing && isAdmin ? (
        <TextareaAutosize
          ref={descRef}
          onBlur={disableDesc}
          onKeyDown={onKeyDownDesc}
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className='mt-3 text-md/6 md:text-xl/6 max-w-[800px] font-semibold opacity-80 bg-transparent break-words outline-none resize-none p-0'
        />
      ) : (
        <h3
          onClick={enableDesc}
          className='mt-3 text-md/6 md:text-xl/6 max-w-[800px] font-semibold opacity-80'
        >
          {desc}
        </h3>
      )}
      <div className='mt-1 flex justify-end'>
        {isAdmin ? (
          <Select
            value={type}
            onValueChange={handleTypeChange}
            disabled={loading}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={type} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='news'>News</SelectItem>
              <SelectItem value='tutorial'>Tutorial</SelectItem>
              <SelectItem value='informative'>Informative article</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge>{type}</Badge>
        )}
      </div>
    </div>
  )
}

export default Toolbar
