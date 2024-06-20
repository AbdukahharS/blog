import { useEffect } from 'react'
import { create } from 'zustand'
import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { db } from '@/lib/firebase/config'

enum Filters {
  all = 'all',
  news = 'news',
  tutorials = 'tutorials',
}

type PostsStoreType = {
  loading: boolean
  posts: DocumentData[]
  filter: Filters
  filterCount: {
    [key: string]: number
  }
  setLoading: (loading: boolean) => void
  setPosts: (posts: DocumentData[]) => void
  setFilterCount: (filterCount: { [key: string]: number }) => void
  setFilter: (filter: string) => void
}

export const usePostsStore = create<PostsStoreType>((set) => ({
  posts: [],
  loading: false,
  filter: Filters.all,
  filterCount: {
    all: 0,
    news: 0,
    tutorials: 0,
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
}))

export const usePosts = () => {
  const { posts, setPosts, setFilterCount, setLoading } = usePostsStore()
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const q = query(collection(db, 'posts'), where('isPublished', '==', true))

      const querySnapshot = await getDocs(q)
      const posts: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() })
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
        tutorials: 0,
      }

      for (const post of posts) {
        const type = post.type as 'news' | 'tutorials'
        count[type]++
        count.all++
      }

      setFilterCount(count)
      setLoading(false)
    }

    if (posts.length > 0) updateFilterCount()
  }, [posts, setFilterCount])
}
