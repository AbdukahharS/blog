import Image from 'next/image'

export default function Home() {
  return (
    <div className='shadcn-card bg-gray-900 text-white p-4 max-w-sm mx-auto'>
      <div className='shadcn-tag bg-indigo-500 text-xs font-bold px-2 py-1 inline-block rounded'>
        LATEST
      </div>
      <div className='shadcn-header my-4'>
        <h2 className='text-xl font-semibold'>
          THERE&apos;S A NEW KID IN TOWN
        </h2>
      </div>
      <div className='shadcn-body'>
        <p className='text-gray-400'>
          We are very excited to introduce you to akidCalledBeast. Please join
          us to learn all about the akidCalledBeast game and upcoming private
          sale and IGO on the Seedify Launchpad on March...
        </p>
      </div>
      <div className='shadcn-footer flex justify-between items-center text-gray-400 text-sm mt-4'>
        <span>Announcements</span>
        <span>20 Mar 2023 • 5 min read</span>
      </div>
    </div>
  )
}
