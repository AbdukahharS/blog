'use client'

import React, { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

const CustomCursor: React.FC = () => {
  const [p, setP] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)
    }

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }

    const onMouseMove = (e: MouseEvent) => {
      setP({ x: e.clientX, y: e.clientY })
    }

    const onMouseEnter = () => {
      setVisible(true)
    }

    const onMouseLeave = () => {
      setVisible(false)
    }

    addEventListeners()
    return () => removeEventListeners()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(target && getComputedStyle(target).cursor === 'pointer')
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className={`${styles.cursor} ${visible ? styles.visible : ''} ${
        hovering ? styles.hovering : ''
      }`}
      style={{
        transform: `translate3d(calc(${p.x}px - 50%), calc(${p.y}px - 50%), 0)`,
      }}
    />
  )
}

export default CustomCursor
