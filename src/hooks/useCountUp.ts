import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  enabled?: boolean
}

export function useCountUp({
  end,
  duration = 1800,
  enabled = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!enabled) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end)
      hasAnimated.current = true
      return
    }

    if (hasAnimated.current) return

    hasAnimated.current = true
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setValue(end)
      }
    }

    requestAnimationFrame(tick)
  }, [duration, enabled, end])

  return value
}
