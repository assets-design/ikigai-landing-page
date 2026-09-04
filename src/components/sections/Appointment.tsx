import { useEffect, useRef, useState } from 'react'
import { APPOINTMENT_HEADING } from '@/content/appointment'
import AppointmentForm from '@/components/ui/AppointmentForm'
import Footer from '@/components/layout/Footer'

type AppointmentProps = {
  stickyBarHidden?: boolean
}

const DESKTOP_QUERY = '(min-width: 640px)'

export default function Appointment({ stickyBarHidden = false }: AppointmentProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const formBarRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  )
  const [isPastHero, setIsPastHero] = useState(false)
  const [isAppointmentInView, setIsAppointmentInView] = useState(false)
  const [formBarHeight, setFormBarHeight] = useState(0)

  const isPinned = isDesktop && !isAppointmentInView
  const isStickyVisible = isPinned && isPastHero

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY)
    const syncDesktop = () => setIsDesktop(desktopQuery.matches)

    syncDesktop()
    desktopQuery.addEventListener('change', syncDesktop)
    return () => desktopQuery.removeEventListener('change', syncDesktop)
  }, [])

  useEffect(() => {
    const appointment = sectionRef.current
    const stats = document.getElementById('stats')
    if (!appointment || !stats) return

    const updateFromRects = () => {
      const viewportBottom = window.innerHeight
      setIsPastHero(stats.getBoundingClientRect().top <= viewportBottom)
      setIsAppointmentInView(appointment.getBoundingClientRect().top < viewportBottom)
    }

    let ticking = false
    const scheduleUpdate = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        updateFromRects()
      })
    }

    const observer = new IntersectionObserver(scheduleUpdate, { threshold: [0, 1] })
    observer.observe(stats)
    observer.observe(appointment)

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    updateFromRects()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  useEffect(() => {
    const formBar = formBarRef.current
    if (!formBar) return

    const updateHeight = () => {
      const height = formBar.offsetHeight
      setFormBarHeight((current) => (current === height ? current : height))
    }

    updateHeight()
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(formBar)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="appointment"
      className={`bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] ${stickyBarHidden ? 'pb-0' : 'pb-[2.25rem]'}`}
      data-node-id="228:1109"
      aria-labelledby="appointment-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div className="mx-auto w-full max-w-[1680px]" data-node-id="202:1030">
          <header>
            <p className="text-label font-medium uppercase text-primary">
              {APPOINTMENT_HEADING.label}
            </p>

            <h2
              id="appointment-heading"
              className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] max-w-[892px] capitalize text-black"
            >
              {APPOINTMENT_HEADING.titleLine1}
              <br />
              {APPOINTMENT_HEADING.titleLine2}
            </h2>

            <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[824px] capitalize text-black">
              {APPOINTMENT_HEADING.description}
            </p>
          </header>

          <div
            className="mt-[clamp(1.25rem,2.08vw,2.5rem)]"
            style={isPinned && formBarHeight > 0 ? { height: formBarHeight } : undefined}
          >
            <div
              ref={formBarRef}
              className={
                isPinned
                  ? `sm:fixed sm:inset-x-0 sm:bottom-0 sm:z-30 bg-white py-[clamp(0.75rem,1.04vw,1.25rem)] sm:pb-[max(clamp(0.75rem,1.04vw,1.25rem),env(safe-area-inset-bottom,0px))] sm:shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                      isStickyVisible
                        ? 'sm:translate-y-0 sm:opacity-100'
                        : 'sm:pointer-events-none sm:translate-y-full sm:opacity-0'
                    }`
                  : ''
              }
              aria-hidden={isPinned && !isStickyVisible}
              inert={isPinned && !isStickyVisible ? true : undefined}
            >
              <div
                className={
                  isPinned
                    ? 'mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]'
                    : ''
                }
              >
                <div className={isPinned ? 'mx-auto w-full max-w-[1680px]' : ''}>
                  <AppointmentForm />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-[clamp(2rem,3.65vw,4.375rem)]">
            <Footer className="mt-[clamp(2.5rem,4.17vw,5rem)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
