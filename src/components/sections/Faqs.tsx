import { FAQ_IMAGE, FAQS, FAQS_HEADING } from '@/content/faqs'
import FaqAccordion from '@/components/ui/FaqAccordion'

export default function Faqs() {
  return (
    <section
      className="bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="149:940"
      aria-labelledby="faqs-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div className="mx-auto w-full max-w-[1680px]">
          <header>
            <p className="text-label font-medium uppercase text-primary">
              {FAQS_HEADING.label}
            </p>

            <h2
              id="faqs-heading"
              className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] capitalize text-black"
            >
              {FAQS_HEADING.title}
            </h2>

            <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[829px] capitalize text-black">
              {FAQS_HEADING.description}
            </p>
          </header>

          <div
            className="mt-[clamp(2rem,3.65vw,4.375rem)] grid grid-cols-1 gap-[clamp(2rem,3.65vw,4.375rem)] lg:grid-cols-[clamp(320px,41.6vw,799px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(1.5rem,3.44vw,4.125rem)]"
          >
            <img
              src={FAQ_IMAGE.src}
              alt={FAQ_IMAGE.alt}
              className="aspect-[799/542] w-full rounded-[clamp(12px,1.15vw,22px)] object-cover"
              loading="lazy"
              data-node-id="149:941"
            />

            <FaqAccordion faqs={FAQS} />
          </div>
        </div>
      </div>
    </section>
  )
}
