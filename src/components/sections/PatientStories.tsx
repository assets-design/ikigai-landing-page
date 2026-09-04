import { PATIENT_STORIES_HEADING } from '@/content/testimonials'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel'

export default function PatientStories() {
  return (
    <section
      className="bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="228:1114"
      aria-labelledby="patient-stories-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <header className="mx-auto w-full max-w-[1680px]">
          <p className="text-label font-medium uppercase text-primary">
            {PATIENT_STORIES_HEADING.label}
          </p>

          <h2
            id="patient-stories-heading"
            className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] capitalize text-black"
          >
            {PATIENT_STORIES_HEADING.titleLine1}
            <br />
            {PATIENT_STORIES_HEADING.titleLine2}
          </h2>

          <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[829px] capitalize text-black">
            {PATIENT_STORIES_HEADING.description}
          </p>
        </header>
      </div>

      <TestimonialCarousel />
    </section>
  )
}
