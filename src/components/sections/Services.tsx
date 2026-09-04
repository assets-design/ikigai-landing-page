import { SERVICES, SERVICES_HEADING } from '@/content/services'
import ServiceCard from '@/components/ui/ServiceCard'

export default function Services() {
  return (
    <section
      className="bg-white pt-[clamp(2.1rem,5.21vw,6.25rem)] pb-[2.25rem] sm:pb-0"
      data-node-id="228:1100"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]">
        <div className="mx-auto w-full max-w-[1680px]">
          <header className="max-w-[829px]">
            <p className="text-label font-medium uppercase text-primary">
              {SERVICES_HEADING.label}
            </p>

            <h2
              id="services-heading"
              className="font-display text-[30px] sm:text-h2 mt-[clamp(0.75rem,1.04vw,1.25rem)] capitalize text-black"
            >
              {SERVICES_HEADING.titleLine1}
              <br className="hidden sm:block" />
              {' '}
              {SERVICES_HEADING.titleLine2}
            </h2>

            <p className="text-body mt-[clamp(1rem,1.56vw,1.875rem)] capitalize text-black">
              {SERVICES_HEADING.description}
            </p>
          </header>

          <div
            className="mt-[clamp(2rem,3.13vw,3.75rem)] grid grid-cols-1 gap-x-[clamp(1rem,2.4vw,2.875rem)] gap-y-[clamp(1.5rem,2.6vw,3.75rem)] lg:grid-cols-2"
            data-node-id="149:521"
          >
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
