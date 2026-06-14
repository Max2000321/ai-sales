'use client'

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Stagger delay in ms before the reveal transition starts. */
  delay?: number
}

export default function AnimateOnScroll({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${className}`}
      style={{ '--animation-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
