import { useParams } from 'next/navigation'
import { useGetPostComments } from '@/hooks/use-posts'

const Comments = () => {
  const { postId } = useParams()
  const { comments, loading } = useGetPostComments(postId as string)

  return (
    <div className='border-t-2 mt-16 '>
      <h1>Comments({comments.length})</h1>
    </div>
  )
}

export default Comments
