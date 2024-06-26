import { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  addDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

import { db, storage } from '@/lib/firebase/config'
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

type postDetails = {
  title?: string
  banner?: { newFile: File | null; oldFile?: string }
  content?: string
  description?: string
  type?: string
  readTime?: number
}

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false)
  const createPost = async (post: postDetails) => {
    setLoading(true)
    const newPost = {
      title: post.title || 'Untitled',
      banner: null,
      content: post.content || '',
      description: post.description || '',
      type: post.type || 'news',
      isPublished: false,
      createdAt: Timestamp.now(),
      readTime: 0,
    }

    const colRef = collection(db, 'posts')
    const docSnap = await addDoc(colRef, newPost)
    setLoading(false)

    return docSnap.id
  }

  const updatePost = async (postId: string, post: postDetails) => {
    let banner = {
      name: '',
      url: '',
    }

    setLoading(true)

    try {
      const docRef = doc(db, 'posts', postId)

      if (!!post.banner?.newFile) {
        if (!!post.banner?.oldFile) {
          const storageRef = ref(storage, `banner/${post.banner.oldFile}`)
          await deleteObject(storageRef)
        }

        banner.name = postId + '_' + post.banner.newFile.name
        const storageRef = ref(storage, `banner/${banner.name}`)
        await uploadBytes(storageRef, post.banner.newFile)
        banner.url = await getDownloadURL(storageRef)
      } else if (post.banner?.newFile === null && post.banner?.oldFile) {
        const storageRef = ref(storage, `banner/${post.banner.oldFile}`)
        await deleteObject(storageRef)
      }
      await updateDoc(docRef, {
        ...post,
        banner: !!banner.name && !!banner.url ? banner : null,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return !!banner.name && !!banner.url ? banner : null
  }

  return { createPost, loading, updatePost }
}