import { useCallback, useEffect, useId, useRef, useState } from 'react'
import AppointmentForm from '@/components/ui/AppointmentForm'
import {
  APPOINTMENT_POPUP,
  APPOINTMENT_POPUP_OPEN_EVENT,
  APPOINTMENT_POPUP_STORAGE_KEY,
} from '@/content/appointment'

const AUTO_SHOW_DELAY_MS = 8000
const FADE_DURATION_MS = 300

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function AppointmentPopup() {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    sessionStorage.setItem(APPOINTMENT_POPUP_STORAGE_KEY, '1')
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem(APPOINTMENT_POPUP_STORAGE_KEY)) {
      return
    }

    const timer = window.setTimeout(open, AUTO_SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    const handleOpenRequest = () => open()
    window.addEventListener(APPOINTMENT_POPUP_OPEN_EVENT, handleOpenRequest)
    return () =>
      window.removeEventListener(APPOINTMENT_POPUP_OPEN_EVENT, handleOpenRequest)
  }, [open])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      const frame = requestAnimationFrame(() => {
        setIsVisible(true)
      })
      return () => cancelAnimationFrame(frame)
    }

    setIsVisible(false)
    const timer = window.setTimeout(() => setIsMounted(false), FADE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isMounted) {
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMounted])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    )

    focusables[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'Tab' || focusables.length === 0) {
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isVisible, close])

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close()
    }
  }

  return (
    <>
      {isMounted ? (
        <div
          className={`appointment-popup-overlay fixed inset-0 z-50 flex items-center justify-center px-[clamp(1rem,2vw,1.5rem)] pt-[max(clamp(1rem,2vw,1.5rem),env(safe-area-inset-top,0px))] pb-[max(clamp(1rem,2vw,1.5rem),env(safe-area-inset-bottom,0px))] transition-opacity duration-300 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          role="presentation"
          onClick={handleOverlayClick}
        >
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`appointment-popup-dialog relative z-10 w-full min-w-0 max-h-full max-w-[min(100%,540px)] overflow-x-hidden overflow-y-auto rounded-[clamp(20px,1.56vw,30px)] bg-white p-[clamp(1.25rem,2.08vw,2.5rem)] shadow-[0_24px_48px_rgba(0,0,0,0.2)] transition-[opacity,transform] duration-300 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-2 scale-[0.98] opacity-0'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label={APPOINTMENT_POPUP.closeLabel}
              className="absolute top-[clamp(0.75rem,1.04vw,1rem)] right-[clamp(0.75rem,1.04vw,1rem)] flex size-[clamp(2rem,2.08vw,2.5rem)] items-center justify-center rounded-full text-navy transition-colors duration-150 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-[clamp(1rem,1.04vw,1.25rem)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="mb-[clamp(1rem,1.56vw,1.875rem)] pr-[clamp(2rem,2.6vw,3rem)]">
              <h2
                id={titleId}
                className="font-display text-h3 font-medium capitalize text-navy"
              >
                {APPOINTMENT_POPUP.title}
              </h2>
              <p className="text-body-sm mt-[clamp(0.375rem,0.52vw,0.625rem)] text-text-muted">
                {APPOINTMENT_POPUP.description}
              </p>
            </div>

            <AppointmentForm layout="stacked" />
          </div>
        </div>
      ) : null}
    </>
  )
}
