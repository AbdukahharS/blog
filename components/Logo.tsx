'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

export const Logo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isMounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <Link href='/' className='text-4xl font-extrabold'>
      <span className='dark:text-violet-100 text-violet-900'>
        {isMounted && isMobile ? 'Sh' : 'Shahzod'}
      </span>
      <span className='text-[#FF6F61]'>.</span>
      <span className='text-primary'>_</span>
    </Link>
  )
}
