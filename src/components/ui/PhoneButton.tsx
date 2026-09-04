import { SITE } from '@/lib/constants'

export default function PhoneButton() {
  return (
    <a
      href={SITE.phoneHref}
      className="inline-flex h-[clamp(44px,2.92vw,56px)] overflow-hidden rounded-[clamp(22px,1.54vw,29.5px)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      aria-label={`Call ${SITE.phone}`}
    >
      <span className="flex h-full w-[clamp(48px,3.44vw,66px)] shrink-0 items-center justify-center rounded-l-[clamp(22px,1.54vw,29.5px)] border-y border-l border-primary bg-white">
        <img
          src="/images/icons/light.gif"
          alt=""
          className="size-[clamp(28px,2.19vw,42px)] object-contain"
        />
      </span>
      <span className="flex h-full min-w-[clamp(140px,10.625vw,204px)] items-center justify-center rounded-r-[clamp(22px,1.54vw,29.5px)] bg-primary px-[clamp(0.75rem,0.78vw,0.94rem)] text-cta font-normal capitalize text-white">
        {SITE.phone}
      </span>
    </a>
  )
}
