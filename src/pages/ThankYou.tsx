import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

const AUTO_REDIRECT_MS = 3000

export default function ThankYou() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/')
    }, AUTO_REDIRECT_MS)

    return () => window.clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2rem,4vw,4rem)]">
      <div className="mx-auto flex w-full max-w-[min(100%,720px)] flex-col items-center text-center">
        <img
          src="/images/icons/check-circle.svg"
          alt=""
          className="size-[clamp(4rem,5vw,5rem)]"
        />

        <h1 className="font-display text-[30px] sm:text-h2 mt-[clamp(2.5rem,3.33vw,4rem)] font-medium capitalize text-black">
          Thank You For Reaching Out
        </h1>

        <p className="font-display text-h3 mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-medium capitalize text-black">
          Your Request Has Been Received Successfully.
        </p>

        <p className="text-body-sm mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[min(100%,560px)] capitalize text-black/70">
          Thank You For Choosing Ikigai Hospitals. Our Team Has Received Your
          Appointment Request And Will Get In Touch With You Shortly To Assist
          You With The Next Steps.
        </p>

        <div className="mt-[clamp(1.5rem,2.08vw,2.5rem)] flex w-full flex-col items-stretch justify-center gap-[clamp(0.75rem,1vw,1rem)] sm:w-auto sm:flex-row sm:items-center">
          <Button variant="navy" onClick={() => navigate('/')}>
            Back To Homepage
          </Button>
          <Button variant="outline-navy" href={SITE.phoneHref}>
            {SITE.phone}
          </Button>
        </div>
      </div>
    </div>
  )
}
