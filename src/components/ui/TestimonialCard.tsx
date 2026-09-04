import type { Testimonial } from '@/content/testimonials'

type TestimonialCardProps = {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article
      className="flex h-full min-h-[clamp(220px,16.2vw,311px)] w-[clamp(280px,23.6vw,453px)] shrink-0 flex-col rounded-[16px] bg-white p-[clamp(1.25rem,1.56vw,1.875rem)] shadow-[0_0_4px_rgba(0,0,0,0.25)]"
      data-node-id="149:882"
    >
      <h3 className="font-display text-h3 capitalize text-black">
        {testimonial.name}
      </h3>

      <p className="text-body-sm mt-[clamp(0.375rem,0.42vw,0.5rem)] capitalize text-text-muted">
        {testimonial.treatment}
      </p>

      <img
        src="/images/icons/stars-5.svg"
        alt={`${testimonial.rating} out of 5 stars`}
        width={152}
        height={25}
        className="mt-[clamp(0.5rem,0.78vw,0.9375rem)] h-[clamp(16px,1.3vw,25px)] w-[clamp(97px,7.9vw,152px)] shrink-0 object-contain object-left"
      />

      <p className="text-body-sm mt-[clamp(1rem,1.56vw,1.875rem)] capitalize text-black">
        {testimonial.quote}
      </p>
    </article>
  )
}
