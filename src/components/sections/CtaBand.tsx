import { CTA_BAND } from '@/content/cta'
import { openAppointmentPopup } from '@/content/appointment'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

export default function CtaBand() {
  return (
    <section
      className="bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="228:1111"
      aria-labelledby="cta-band-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div
          className="mx-auto flex w-full max-w-[1680px] min-h-[clamp(320px,24.84vw,477px)] flex-col justify-center rounded-[clamp(24px,2.29vw,44px)] bg-navy px-[clamp(2rem,4.17vw,5rem)] py-[clamp(2rem,4.17vw,5rem)]"
          data-node-id="149:621"
        >
          <h2
            id="cta-band-heading"
            className="font-display text-[30px] leading-[1.13] max-w-[815px] capitalize text-white sm:text-h2"
            data-node-id="149:623"
          >
            {CTA_BAND.title}
          </h2>

          <p
            className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[638px] capitalize text-white"
            data-node-id="149:624"
          >
            {CTA_BAND.description}
          </p>

          <div
            className="mt-[clamp(2rem,3.13vw,3.75rem)] flex flex-row flex-nowrap items-center gap-[clamp(0.75rem,1.04vw,1.25rem)] sm:flex-wrap"
            data-node-id="149:622"
          >
            <Button
              variant="white"
              className="min-w-0 flex-1 max-sm:!px-3 max-sm:!text-[0.73125rem] sm:flex-none"
              onClick={openAppointmentPopup}
            >
              {CTA_BAND.primaryCta}
            </Button>
            <Button
              variant="outline-white"
              className="min-w-0 flex-1 max-sm:!px-3 max-sm:!text-[0.73125rem] sm:flex-none"
              href={SITE.phoneHref}
            >
              {SITE.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
