import { useCallback, useEffect, useRef } from 'react'
import { SPECIALISTS } from '@/content/specialists'
import SpecialistCard from '@/components/ui/SpecialistCard'

const CARD_WIDTH_CLASS = 'w-[clamp(240px,21.1vw,405px)]'
const CARD_GAP = 'gap-[clamp(0.75rem,1.04vw,1.25rem)]'
const AUTO_SCROLL_SPEED = 0.6

const LOOPED_SPECIALISTS = [
  ...SPECIALISTS,
  ...SPECIALISTS,
  ...SPECIALISTS,
]

export default function SpecialistCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isHovered = useRef(false)
  const isAutoScrolling = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const animationRef = useRef<number | null>(null)

  const getSetWidth = useCallback(() => {
    const el = scrollRef.current
    if (!el) return 0
    return el.scrollWidth / 3
  }, [])

  const normalizeScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const setWidth = getSetWidth()
    if (setWidth <= 0) return

    if (el.scrollLeft >= setWidth * 2) {
      el.scrollLeft -= setWidth
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += setWidth
    }
  }, [getSetWidth])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const initScroll = () => {
      const setWidth = getSetWidth()
      if (setWidth > 0) {
        isAutoScrolling.current = true
        el.scrollLeft = setWidth
        isAutoScrolling.current = false
      }
    }

    initScroll()

    // Wait for layout if cards aren't measured yet
    const frame = requestAnimationFrame(initScroll)

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      return () => cancelAnimationFrame(frame)
    }

    const tick = () => {
      if (el && !isHovered.current) {
        isAutoScrolling.current = true
        el.scrollLeft += AUTO_SCROLL_SPEED
        normalizeScroll()
        isAutoScrolling.current = false
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    animationRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [getSetWidth, normalizeScroll])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    // Ignore link/button clicks inside cards — only drag from the track
    if ((event.target as HTMLElement).closest('a, button')) return

    isDragging.current = true
    dragStartX.current = event.clientX
    dragStartScrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.setPointerCapture(event.pointerId)
    scrollRef.current.classList.add('specialist-carousel-grabbing')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return

    const delta = event.clientX - dragStartX.current
    scrollRef.current.scrollLeft = dragStartScrollLeft.current - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return

    isDragging.current = false
    scrollRef.current.releasePointerCapture(event.pointerId)
    scrollRef.current.classList.remove('specialist-carousel-grabbing')
    normalizeScroll()
  }

  const handleScroll = () => {
    // Programmatic auto-scroll also fires onScroll — don't normalize mid-tick
    if (isDragging.current || isAutoScrolling.current) return
    normalizeScroll()
  }

  return (
    <div
      className="relative mt-[clamp(2rem,3.65vw,4.375rem)]"
      data-node-id="202:1029"
      aria-label="Specialist profiles carousel"
      onMouseEnter={() => {
        isHovered.current = true
      }}
      onMouseLeave={() => {
        isHovered.current = false
      }}
    >
      <div className="specialist-carousel-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(2rem,8vw,7.5rem)]" />
      <div className="specialist-carousel-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(2rem,8vw,7.5rem)]" />

      <div
        ref={scrollRef}
        className={`specialist-carousel-scroll specialist-carousel-grab flex w-full overflow-x-auto ${CARD_GAP} pl-[clamp(1.25rem,6.25vw,7.5rem)] pr-[clamp(1.25rem,6.25vw,7.5rem)]`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={handleScroll}
        onDragStart={(event) => event.preventDefault()}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
      >
        {LOOPED_SPECIALISTS.map((specialist, index) => (
          <div
            key={`${specialist.name}-${index}`}
            className={`${CARD_WIDTH_CLASS} shrink-0 self-stretch`}
            aria-hidden={index >= SPECIALISTS.length ? true : undefined}
          >
            <SpecialistCard specialist={specialist} />
          </div>
        ))}
      </div>
    </div>
  )
}
