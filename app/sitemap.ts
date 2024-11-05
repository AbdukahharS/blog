import { MetadataRoute } from 'next'
import { getDocs, collection, query, where } from 'firebase/firestore'

import { db } from '@/lib/firebase/config'
import { Post } from '@/hooks/use-posts-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: Post[] = []

  try {
    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, where('isPublished', '==', true))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post)
    })
  } catch (e) {
    console.error(e)
  }

  const changeFrequency = 'weekly' as const

  return [
    {
      url: 'https://blog.abdukahhar.uz',
      priority: 1,
    },
    {
      url: 'https://blog.abdukahhar.uz/unpublished',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://blog.abdukahhar.uz/p/${post.id}`,
      lastModified: post.createdAt.toDate(),
      changeFrequency: changeFrequency as typeof changeFrequency,
      priority: 0.5,
    })),
  ]
}
