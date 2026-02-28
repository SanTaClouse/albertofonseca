'use client'

import { useInView } from '@/hooks/useInView'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: 0 | 100 | 200 | 300 | 400
}

const delayClass = {
  0: '',
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
  400: 'delay-400',
}

export default function FadeInSection({ children, className = '', delay = 0 }: FadeInSectionProps) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${delayClass[delay]}
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
