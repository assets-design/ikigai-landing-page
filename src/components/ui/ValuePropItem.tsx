import type { ValueProp } from '@/content/whyIkigai'

type ValuePropItemProps = {
  value: ValueProp
}

export default function ValuePropItem({ value }: ValuePropItemProps) {
  return (
    <article className="flex flex-col">
      <img
        src={value.icon}
        alt={value.iconAlt}
        className="size-[clamp(48px,4.06vw,78px)] object-contain"
        loading="lazy"
      />

      <h3 className="font-display text-h3 mt-[clamp(0.75rem,1.56vw,1.875rem)] capitalize text-black">
        {value.title}
      </h3>

      <p className="text-body-sm mt-[clamp(0.5rem,0.99vw,1.1875rem)] max-w-[777px] capitalize text-black">
        {value.description}
      </p>
    </article>
  )
}
