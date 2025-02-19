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
  deleteDoc,
} from 'firebase/firestore'

import useStorage from '@/hooks/use-storage'
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
        posts.push({ id: doc.id, ...doc.data() } as Post)
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
        informative: 0,
      }

      for (const post of posts) {
        const type = post.type as 'news' | 'tutorial' | 'informative'
        count[type]++
        count.all++
      }

      setFilterCount(count)
      setLoading(false)
    }

    if (posts.length > 0) updateFilterCount()
  }, [posts, setFilterCount, setLoading])
}

export const useFetchUnpublishedPosts = () => {
  const { posts, setPosts, setFilterCount, setLoading } = usePostsStore()

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'posts'),
        where('isPublished', '==', false),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const posts: Post[] = []
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as Post)
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
        informative: 0,
      }

      for (const post of posts) {
        const type = post.type as 'news' | 'tutorial' | 'informative'
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
  const [notfound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDocs = async () => {
      setLoading(true)
      try {
        const docRef = doc(db, 'posts', postId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post)
        } else {
          setNotFound(true)
        }
      } catch (e) {
        setNotFound(true)
      }
      setLoading(false)
    }

    getDocs()
  }, [postId])

  return { post, loading, notfound }
}

type postDetails = {
  title?: string
  banner?: { newFile: File | null; oldFile?: string }
  content?: string
  description?: string
  type?: string
  isPublished?: boolean
  views?: number
}

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false)
  const { uploadFile, deleteFile } = useStorage()

  const createPost = async (post: postDetails) => {
    setLoading(true)
    const newPost = {
      title: post.title || 'Untitled',
      banner: null,
      content: post.content || '',
      description: post.description || 'Description',
      type: post.type || 'news',
      isPublished: false,
      createdAt: Timestamp.now(),
      views: 0,
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

      if (!post.banner) {
        await updateDoc(docRef, post)
      } else {
        if (!!post.banner?.newFile) {
          if (!!post.banner?.oldFile) {
            await deleteFile(`banner/${post.banner.oldFile}`)
          }

          banner.name = postId + '_' + post.banner.newFile.name
          banner.url = await uploadFile(
            post.banner.newFile,
            `banner/${banner.name}`
          )
        } else if (post.banner?.newFile === null && post.banner?.oldFile) {
          deleteFile(`banner/${post.banner.oldFile}`)
        }

        await updateDoc(docRef, {
          ...post,
          banner: !!banner.name && !!banner.url ? banner : null,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return !!banner.name && !!banner.url ? banner : null
  }

  const deletePost = async (postId: string) => {
    setLoading(true)

    try {
      const postRef = doc(db, 'posts', postId)
      const postDoc = await getDoc(postRef)
      const bannerName = postDoc.data()?.banner?.name
      if (!!bannerName) {
        await deleteFile(`banner/${bannerName}`)
      }
      await deleteDoc(postRef)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { createPost, loading, updatePost, deletePost }
}

type Comment = {
  id: string
  postId: string
  author: {
    id: string
    name: string
  }
  content: string
  createdAt: Timestamp
}

export const useGetPostComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getComments = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const commentsArray: Comment[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        commentsArray.push({
          id: doc.id,
          postId: data.postId,
          author: data.author,
          content: data.content,
          createdAt: data.createdAt,
        } as Comment)
      })
      setComments(commentsArray)
      setLoading(false)
    }

    getComments()
  }, [postId])

  return { comments, loading }
}