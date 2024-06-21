import { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore'

import { db } from '@/lib/firebase/config'
import { usePostsStore, Post } from '@/hooks/use-posts-store'

export const useFetchPosts = () => {
  const { posts, setPosts, setFilterCount, setLoading } = usePostsStore()

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'posts'),
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc')
      )

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

export const useGetPost = (postId: string) => {
  const [post, setPost] = useState<Post>({} as Post)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDocs = async () => {
      setLoading(true)
      const docRef = doc(db, 'posts', postId)
      const docSnap = await getDoc(docRef)
      setPost({ id: docSnap.id, ...docSnap.data() } as Post)
      setLoading(false)
    }

    getDocs()
  }, [postId])

  return { post, loading }
}
