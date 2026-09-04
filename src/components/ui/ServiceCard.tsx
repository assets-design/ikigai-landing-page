import type { Service } from '@/content/services'
import ServiceTag from '@/components/ui/ServiceTag'

type ServiceCardProps = {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[817/438] overflow-hidden rounded-[clamp(6px,0.42vw,8px)]">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[clamp(6.5rem,8.18vw,9.8125rem)] bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 px-[clamp(1rem,1.56vw,1.875rem)] pb-[clamp(1rem,1.56vw,1.875rem)]">
          <h3 className="font-display text-h3 capitalize text-white">
            {service.title}
          </h3>
          <p className="text-body-sm mt-[clamp(0.375rem,0.52vw,0.625rem)] capitalize text-white">
            {service.description}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(1rem,1.56vw,1.875rem)] flex flex-wrap gap-[clamp(0.5rem,0.78vw,0.9375rem)]">
        {service.tags.map((tag) => (
          <ServiceTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  )
}
