import { useEffect } from 'react'
import { create } from 'zustand'
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore'

import { db } from '@/lib/firebase/config'

enum Filters {
  all = 'all',
  news = 'news',
  tutorial = 'tutorial',
}

export interface Post {
  id: string
  title: string
  description: string
  type: Filters
  isPublished: boolean
  createdAt: Timestamp
  readTime: number
  banner: string
}

type PostsStoreType = {
  loading: boolean
  posts: Post[]
  filter: Filters
  search: string
  filterCount: {
    [key: string]: number
  }
  setLoading: (loading: boolean) => void
  setPosts: (posts: Post[]) => void
  setFilterCount: (filterCount: { [key: string]: number }) => void
  setFilter: (filter: string) => void
  setSearch: (search: string) => void
}

export const usePostsStore = create<PostsStoreType>((set) => ({
  posts: [],
  loading: true,
  filter: Filters.all,
  search: '',
  filterCount: {
    all: 0,
    news: 0,
    tutorial: 0,
  },
  setLoading: (loading) => {
    set({ loading })
  },
  setPosts: (posts) => {
    set({ posts })
  },
  setFilterCount: (filterCount: { [key: string]: number }) => {
    set({ filterCount })
  },
  setFilter: (filter: string) => {
    set({ filter: filter as Filters })
  },
  setSearch: (search: string) => {
    set({ search })
  },
}))

export const usePosts = () => {
  const { posts, setPosts, setFilterCount, setLoading } = usePostsStore()
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const q = query(collection(db, 'posts'), where('isPublished', '==', true))

      const querySnapshot = await getDocs(q)
      const posts: Post[] = []
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data(), description: '' } as Post)
        posts.push({ id: doc.id, ...doc.data(), description: '' } as Post)
      })
      setPosts(posts)
      setLoading(false)
    }

    getPosts()
  }, [setPosts, setLoading])

  useEffect(() => {
    const updateFilterCount = () => {
      setLoading(true)
      const count = {
        all: 0,
        news: 0,
        tutorial: 0,
      }

      for (const post of posts) {
        const type = post.type as 'news' | 'tutorial'
        count[type]++
        count.all++
      }

      setFilterCount(count)
      setLoading(false)
    }

    if (posts.length > 0) updateFilterCount()
  }, [posts, setFilterCount, setLoading])
}
