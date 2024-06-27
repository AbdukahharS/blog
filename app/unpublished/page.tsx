'use client'

import { notFound } from 'next/navigation'

import { useFetchUnpublishedPosts } from '@/hooks/use-posts'
import { useUser } from '@/hooks/use-user'
import { Hero } from '../_components/Hero'
import Posts from '../_components/Posts'

export default function UnPublished() {
  const { isAdmin, loading } = useUser()

  if (!loading && !isAdmin) notFound()

  useFetchUnpublishedPosts()

  return (
    !loading && (
      <div className='min-h-[calc(100vh-92px)] flex flex-col'>
        <Hero />
        <Posts />
      </div>
    )
  )
}
