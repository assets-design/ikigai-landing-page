type ServiceTagProps = {
  label: string
}

export default function ServiceTag({ label }: ServiceTagProps) {
  return (
    <span className="inline-flex h-[clamp(2.25rem,2.6vw,3.125rem)] items-center rounded-[clamp(1.125rem,1.3vw,1.5625rem)] border border-black px-[clamp(0.875rem,1.25vw,1.5rem)] text-body capitalize">
      {label}
    </span>
  )
}
