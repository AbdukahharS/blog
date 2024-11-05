import { Metadata, ResolvingMetadata } from 'next'
import { doc, getDoc } from 'firebase/firestore'

import { Post } from '@/hooks/use-posts-store'
import { db } from '@/lib/firebase/config'

type Props = {
  params: Promise<{ postId: string }>
}

const generateMetadataFn = async (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  // read route params
  const id = (await params).postId
  let post: Partial<Post> = {}

  // fetch data
  try {
    const docRef = doc(db, 'posts', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      post = { id: docSnap.id, ...docSnap.data() } as Post
    }
  } catch (e) {
    console.error(e)
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  if (post) {
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.banner
          ? [post.banner.url, ...previousImages]
          : previousImages,
      },
    }
  } else {
    return (await parent) as Metadata
  }
}

export default generateMetadataFn