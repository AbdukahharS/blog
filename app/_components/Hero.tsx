import Image from 'next/image'

import { Filters } from './Filters'
import { Search } from './Search'

export const Hero = () => {
  return (
    <div className='lg:max-w-7xl mx-auto pt-4'>
      <div className='flex justify-around items-center px-6 gap-6 md:flex-row flex-col-reverse max-w-[calc(100vw-3rem)]'>
        <div>
          <h1 className='text-4xl md:text-6xl font-extrabold'>
            Shahzod<span className='text-primary'>&apos;</span>s Blog
          </h1>
          <h2 className='opacity-80 mt-4 text-lg md:text-xl'>
            Join me as I delve into the world of web development. <br /> Explore
            in-depth articles, tutorials, and tips (mostly in Uzbek).
          </h2>
        </div>
        <div className='relative h-[200px] w-[200px] sm:h-[300px] sm:w-[500px]'>
          <Image
            src='/hero.svg'
            alt='Hello World code'
            fill
            priority
            loading='eager'
          />
        </div>
      </div>
      <div className='flex justify-between items-center md:flex-row-reverse flex-col-reverse gap-4 w-full px-6 lg:px-12 mt-8 md:mt-0 max-w-[calc(100vw-3rem)]'>
        <Search />
        <Filters />
      </div>
    </div>
  )
}
