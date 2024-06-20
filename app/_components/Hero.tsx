import Image from 'next/image'

import { Filters } from './Filters'

export const Hero = () => {
  return (
    <div className='lg:max-w-7xl mx-auto pt-4'>
      <div className='flex justify-around items-center px-6 gap-6 md:flex-row flex-col-reverse'>
        <h1 className='text-4xl md:text-6xl font-extrabold'>
          Shahzod<span className='text-primary'>&apos;</span>s Blog
        </h1>
        <div className='relative h-[200px] w-[200px] sm:h-[300px] sm:w-[500px]'>
          <Image src='/hero.svg' alt='Hello World code' fill loading='lazy' />
        </div>
      </div>
      <Filters />
    </div>
  )
}
