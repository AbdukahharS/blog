import { create } from 'zustand'
import { Timestamp } from 'firebase/firestore'

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
  content: string
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
