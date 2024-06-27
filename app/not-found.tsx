import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='flex justify-center flex-col gap-8 md:gap-12 items-center h-[calc(100vh-92px)] px-12'>
      <Image
        src='/not-found.svg'
        alt='Not found'
        width={300}
        height={300}
        className='w-[200px] sm:w-[300px]'
        priority
      />
      <h1 className='text-2xl text-center sm:text-4xl font-bold md:font-extrabold'>
        This page does not exist
      </h1>
    </div>
  )
}

export default NotFound
