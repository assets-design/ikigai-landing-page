import { useEffect, useState } from 'react'
import { openAppointmentPopup } from '@/content/appointment'
import { SITE } from '@/lib/constants'

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  )
}

const actionButtonBaseClassName =
  'inline-flex min-h-9 max-w-[42%] items-center justify-center gap-1 rounded-full px-2 py-1.5 text-[0.6875rem] leading-tight font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:text-body-sm'

type MobileStickyBarProps = {
  onHiddenChange?: (hidden: boolean) => void
}

export default function MobileStickyBar({ onHiddenChange }: MobileStickyBarProps) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    onHiddenChange?.(isHidden)
  }, [isHidden, onHiddenChange])

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return

    const mobileQuery = window.matchMedia('(max-width: 639px)')

    const updateHidden = (isFooterVisible: boolean) => {
      const hidden = mobileQuery.matches && isFooterVisible
      setIsHidden(hidden)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        updateHidden(entry.isIntersecting)
      },
      {
        // Hide as the footer nears the sticky bar zone at the bottom of the viewport.
        rootMargin: '0px 0px -72px 0px',
        threshold: 0,
      },
    )

    const onMobileChange = () => {
      if (!mobileQuery.matches) {
        setIsHidden(false)
      }
    }

    observer.observe(footer)
    mobileQuery.addEventListener('change', onMobileChange)

    return () => {
      observer.disconnect()
      mobileQuery.removeEventListener('change', onMobileChange)
    }
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-40 px-[clamp(1.25rem,6.25vw,7.5rem)] pb-[max(clamp(12px,1.56vw,30px),env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 ease-in-out motion-reduce:transition-none sm:hidden ${
        isHidden
          ? 'pointer-events-none translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
      aria-label="Quick actions"
      aria-hidden={isHidden}
    >
      <div className="mx-auto flex h-[clamp(56px,4.375vw,84px)] w-full max-w-[1396px] items-center justify-between rounded-[clamp(32px,2.92vw,56px)] bg-white px-[clamp(0.75rem,1.25vw,1.5rem)] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={openAppointmentPopup}
          className={`${actionButtonBaseClassName} shrink-0 bg-navy text-white`}
        >
          <img
            src="/images/icons/calendar.svg"
            alt=""
            className="size-4 shrink-0 brightness-0 invert"
          />
          Book An Appointment
        </button>

        <img
          src="/images/brand/logo-icon.svg"
          alt={SITE.name}
          className="h-[clamp(32px,2.6vw,40px)] w-auto shrink-0"
        />

        <a
          href={SITE.phoneHref}
          className={`${actionButtonBaseClassName} shrink-0 border border-navy bg-transparent text-navy hover:bg-navy/5`}
          aria-label={`Call ${SITE.phone}`}
        >
          <PhoneIcon className="size-4 shrink-0" />
          {SITE.phone}
        </a>
      </div>
    </nav>
  )
}
