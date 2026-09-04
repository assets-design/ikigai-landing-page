import { openAppointmentPopup } from '@/content/appointment'
import Button from '@/components/ui/Button'
import PhoneButton from '@/components/ui/PhoneButton'
import { SITE } from '@/lib/constants'

const HEADER_TOP =
  'calc(env(safe-area-inset-top, 0px) + clamp(12px, 1.56vw, 30px))'

export default function Header() {
  return (
    <>
      {/* Covers the iOS/WhatsApp status bar so scrolled text and Maps layers cannot paint there. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-white"
        style={{ height: 'env(safe-area-inset-top, 0px)' }}
      />
      <header
        className="fixed right-0 left-0 z-50 px-[clamp(1.25rem,6.25vw,7.5rem)]"
        style={{ top: HEADER_TOP }}
      >
        <div
          className="mx-auto flex h-[clamp(56px,4.375vw,84px)] w-full max-w-[1396px] lg:max-w-[1117px] items-center justify-between rounded-[clamp(32px,2.92vw,56px)] bg-white px-[clamp(1rem,1.56vw,1.875rem)] shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          data-node-id="149:783"
        >
          <a href="/" className="flex shrink-0 items-center gap-[clamp(6px,0.52vw,10px)]">
            <img
              src="/images/brand/logo-icon.svg"
              alt=""
              className="h-[clamp(40px,3.24vw,62px)] w-auto"
              data-node-id="149:786"
            />
            <img
              src="/images/brand/logo-wordmark.svg"
              alt={SITE.name}
              className="h-[clamp(36px,2.94vw,56px)] w-auto"
              data-node-id="149:796"
            />
          </a>

          <div className="flex items-center gap-[clamp(6px,0.52vw,10px)]">
            <Button
              variant="navy"
              onClick={openAppointmentPopup}
              className="inline-flex w-[clamp(160px,12.03vw,231px)]"
            >
              Book an Appointment
            </Button>
            <div className="hidden sm:block">
              <PhoneButton />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
