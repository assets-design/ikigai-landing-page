import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

const AUTO_REDIRECT_MS = 3000

export default function NotFound() {
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
        <p
          className="font-display text-[clamp(4rem,8vw,6rem)] font-medium leading-none text-navy"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-display text-[30px] sm:text-h2 mt-[clamp(2.5rem,3.33vw,4rem)] font-medium capitalize text-black">
          Page Not Found
        </h1>

        <p className="font-display text-h3 mt-[clamp(0.5rem,0.78vw,0.9375rem)] font-medium capitalize text-black">
          This Page Doesn't Exist Or Has Moved.
        </p>

        <p className="text-body-sm mt-[clamp(1rem,1.56vw,1.875rem)] max-w-[min(100%,560px)] capitalize text-black/70">
          The Page You're Looking For Isn't Available. You'll Be Redirected To
          The Homepage Shortly.
        </p>

        <div className="mt-[clamp(1.5rem,2.08vw,2.5rem)] flex w-full flex-col items-stretch justify-center gap-[clamp(0.75rem,1vw,1rem)] sm:w-auto sm:flex-row sm:items-center">
          <Button variant="navy" onClick={() => navigate('/')}>
            Back To Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
