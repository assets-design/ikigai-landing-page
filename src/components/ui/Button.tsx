type ButtonVariant = 'navy' | 'red' | 'white' | 'outline-white' | 'outline-navy'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const variantStyles: Record<ButtonVariant, string> = {
  navy: 'bg-navy text-white hover:brightness-110',
  red: 'bg-primary text-white hover:brightness-110',
  white: 'bg-white text-black hover:bg-white/90',
  'outline-white':
    'border border-white bg-transparent text-white hover:bg-white/10',
  'outline-navy':
    'border border-navy bg-transparent text-navy hover:bg-navy/5',
}

export default function Button({
  children,
  variant = 'navy',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex h-[clamp(44px,2.92vw,56px)] cursor-pointer items-center justify-center rounded-[clamp(22px,1.54vw,29.5px)] px-[clamp(1rem,1.2vw,1.44rem)] text-cta font-normal capitalize whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'

  const classes = `${base} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
