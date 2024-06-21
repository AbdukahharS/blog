'use client'

import { useFetchPosts } from '@/hooks/use-posts'
import { Hero } from './_components/Hero'
import Posts from './_components/Posts'

export default function Home() {
  useFetchPosts()

  return (
    <div className='min-h-[calc(100vh-92px)] flex flex-col'>
      <Hero />
      <Posts />
    </div>
  )
}
