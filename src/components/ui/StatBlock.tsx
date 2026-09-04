import { useEffect, useRef, useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'

interface StatBlockProps {
  value: number
  suffix: string
  label: string
}

export default function StatBlock({ value, suffix, label }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp({ end: value, enabled: isVisible })

  return (
    <div ref={ref}>
      <p className="font-display text-stat h-[clamp(3.5rem,5.57vw,6.6875rem)] capitalize text-black">
        {count}
        {suffix}
      </p>
      <p className="text-body mt-[clamp(0.5rem,0.78vw,0.9375rem)] uppercase text-black">
        {label}
      </p>
    </div>
  )
}
