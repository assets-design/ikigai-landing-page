import { useId, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  APPOINTMENT_HEADING,
  TREATMENT_OPTIONS,
} from '@/content/appointment'
import { submitAppointmentToTeleCrm } from '@/lib/telecrm'
import {
  appointmentFieldClassName,
  appointmentFieldErrorClassName,
  appointmentSubmitClassName,
} from '@/components/ui/formFieldStyles'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type AppointmentFormProps = {
  layout?: 'inline' | 'stacked'
}

type FieldName = 'name' | 'phone' | 'treatment' | 'preferredDate'

type FormValues = Record<FieldName, string>

type FieldErrors = Partial<Record<FieldName, string>>

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/

const PHONE_ERROR_MESSAGE =
  'Phone number must be 10 digits starting with 6, 7, 8, or 9'

const PAST_DATE_ERROR_MESSAGE = 'Please select today or a future date'

function getTodayDateString(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getFieldError(field: FieldName, values: FormValues): string | undefined {
  switch (field) {
    case 'name':
      if (!values.name.trim()) {
        return 'Name is required'
      }
      return undefined
    case 'phone': {
      const digits = values.phone.replace(/\D/g, '')
      if (!digits) {
        return 'Phone number is required'
      }
      if (!INDIAN_PHONE_REGEX.test(digits)) {
        return PHONE_ERROR_MESSAGE
      }
      return undefined
    }
    case 'treatment':
      if (!values.treatment) {
        return 'Please select a treatment'
      }
      return undefined
    case 'preferredDate':
      if (!values.preferredDate) {
        return 'Preferred date is required'
      }
      if (values.preferredDate < getTodayDateString()) {
        return PAST_DATE_ERROR_MESSAGE
      }
      return undefined
  }
}

function validateAll(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}

  for (const field of Object.keys(values) as FieldName[]) {
    const error = getFieldError(field, values)
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

function isFormValid(values: FormValues): boolean {
  return Object.keys(validateAll(values)).length === 0
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

function fieldClassName(hasError: boolean) {
  return `${appointmentFieldClassName}${hasError ? ` ${appointmentFieldErrorClassName}` : ''}`
}

export default function AppointmentForm({ layout = 'inline' }: AppointmentFormProps) {
  const navigate = useNavigate()
  const formId = useId()
  const dateInputRef = useRef<HTMLInputElement>(null)
  const minDate = getTodayDateString()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [treatment, setTreatment] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})

  const values: FormValues = { name, phone, treatment, preferredDate }
  const formIsValid = isFormValid(values)

  const showError = (field: FieldName) => Boolean(touched[field] && errors[field])

  const openDatePicker = () => {
    const input = dateInputRef.current
    if (!input) {
      return
    }

    try {
      input.showPicker?.()
    } catch {
      input.focus()
    }
  }

  const handleBlur = (field: FieldName, fieldValue: string) => {
    const nextValues = { ...values, [field]: fieldValue }
    setTouched((previous) => ({ ...previous, [field]: true }))
    setErrors((previous) => ({
      ...previous,
      [field]: getFieldError(field, nextValues),
    }))
  }

  const updateField = (
    field: FieldName,
    nextValues: FormValues,
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value)
    if (touched[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: getFieldError(field, nextValues),
      }))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    setTouched({
      name: true,
      phone: true,
      treatment: true,
      preferredDate: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setMessage('Please fix the errors below before submitting.')
      return
    }

    setStatus('submitting')
    setMessage('')

    const normalizedPhone = normalizePhone(phone)

    // Temporary: always redirect to thank-you until TeleCRM license is active.
    void submitAppointmentToTeleCrm({
      name: name.trim(),
      phone: normalizedPhone,
      treatment,
      preferredDate,
    })

    navigate('/thank-you')
  }

  return (
    <div className="w-full min-w-0" data-node-id="149:679">
      <form
        onSubmit={handleSubmit}
        className={`grid w-full min-w-0 grid-cols-1 gap-[clamp(0.75rem,0.83vw,1rem)] ${
          layout === 'stacked' ? '' : 'sm:grid-cols-2 xl:grid-cols-5'
        }`}
        noValidate
      >
        <div className="min-w-0">
          <label className="sr-only" htmlFor={`${formId}-name`}>
            Your Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            value={name}
            onChange={(event) =>
              updateField('name', { ...values, name: event.target.value }, setName, event.target.value)
            }
            onBlur={(event) => handleBlur('name', event.target.value)}
            className={fieldClassName(showError('name'))}
            aria-invalid={showError('name')}
            aria-describedby={showError('name') ? `${formId}-name-error` : undefined}
            required
          />
          {showError('name') ? (
            <p
              id={`${formId}-name-error`}
              className="text-body-sm mt-[clamp(0.25rem,0.42vw,0.5rem)] px-[clamp(1rem,1.56vw,1.875rem)] text-primary"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="min-w-0">
          <label className="sr-only" htmlFor={`${formId}-phone`}>
            Phone Number
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            placeholder="Phone Number"
            value={phone}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, '').slice(0, 10)
              updateField('phone', { ...values, phone: digits }, setPhone, digits)
            }}
            onBlur={(event) => handleBlur('phone', event.target.value.replace(/\D/g, '').slice(0, 10))}
            className={fieldClassName(showError('phone'))}
            aria-invalid={showError('phone')}
            aria-describedby={showError('phone') ? `${formId}-phone-error` : undefined}
            required
          />
          {showError('phone') ? (
            <p
              id={`${formId}-phone-error`}
              className="text-body-sm mt-[clamp(0.25rem,0.42vw,0.5rem)] px-[clamp(1rem,1.56vw,1.875rem)] text-primary"
            >
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="relative min-w-0">
            <label className="sr-only" htmlFor={`${formId}-treatment`}>
              Treatment
            </label>
            <select
              id={`${formId}-treatment`}
              name="treatment"
              value={treatment}
              onChange={(event) =>
                updateField(
                  'treatment',
                  { ...values, treatment: event.target.value },
                  setTreatment,
                  event.target.value,
                )
              }
              onBlur={(event) => handleBlur('treatment', event.target.value)}
              className={`${fieldClassName(showError('treatment'))} appearance-none pr-[clamp(2.5rem,3.5vw,3.5rem)] ${
                treatment ? 'text-black' : 'text-black/40'
              }`}
              aria-invalid={showError('treatment')}
              aria-describedby={
                showError('treatment') ? `${formId}-treatment-error` : undefined
              }
              required
            >
              <option value="" disabled>
                Treatment
              </option>
              {TREATMENT_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
            <img
              src="/images/icons/chevron-down.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 right-[clamp(1rem,1.56vw,1.875rem)] h-[10px] w-[19px] -translate-y-1/2"
            />
          </div>
          {showError('treatment') ? (
            <p
              id={`${formId}-treatment-error`}
              className="text-body-sm mt-[clamp(0.25rem,0.42vw,0.5rem)] px-[clamp(1rem,1.56vw,1.875rem)] text-primary"
            >
              {errors.treatment}
            </p>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="relative w-full min-w-0 overflow-hidden">
            <label className="sr-only" htmlFor={`${formId}-date`}>
              Preferred Date
            </label>
            <input
              ref={dateInputRef}
              id={`${formId}-date`}
              name="preferredDate"
              type="date"
              min={minDate}
              value={preferredDate}
              onClick={openDatePicker}
              onFocus={openDatePicker}
              onChange={(event) =>
                updateField(
                  'preferredDate',
                  { ...values, preferredDate: event.target.value },
                  setPreferredDate,
                  event.target.value,
                )
              }
              onBlur={(event) => handleBlur('preferredDate', event.target.value)}
              className={`${fieldClassName(showError('preferredDate'))} relative cursor-pointer appearance-none pr-[clamp(2.5rem,3.5vw,3.5rem)] ${
                preferredDate ? 'text-black' : 'text-transparent'
              } [&::-webkit-date-and-time-value]:min-w-0 [&::-webkit-datetime-edit]:max-w-full [&::-webkit-datetime-edit]:min-w-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:h-auto [&::-webkit-calendar-picker-indicator]:max-h-full [&::-webkit-calendar-picker-indicator]:w-auto [&::-webkit-calendar-picker-indicator]:max-w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
              aria-invalid={showError('preferredDate')}
              aria-describedby={
                showError('preferredDate') ? `${formId}-date-error` : undefined
              }
              required
            />
            {!preferredDate ? (
              <span
                aria-hidden="true"
                className="text-field pointer-events-none absolute top-1/2 left-[clamp(1rem,1.56vw,1.875rem)] -translate-y-1/2 font-medium capitalize text-black/40"
              >
                Preferred Date
              </span>
            ) : null}
            <img
              src="/images/icons/calendar.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 right-[clamp(1rem,1.56vw,1.875rem)] h-[clamp(18px,1.6vw,31px)] w-[clamp(18px,1.7vw,33px)] -translate-y-1/2"
            />
          </div>
          {showError('preferredDate') ? (
            <p
              id={`${formId}-date-error`}
              className="text-body-sm mt-[clamp(0.25rem,0.42vw,0.5rem)] px-[clamp(1rem,1.56vw,1.875rem)] text-primary"
            >
              {errors.preferredDate}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={!formIsValid || status === 'submitting'}
          aria-disabled={!formIsValid || status === 'submitting'}
          className={appointmentSubmitClassName}
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Request'}
        </button>
      </form>

      {message ? (
        <p
          role="status"
          className={`text-body-sm mt-[clamp(0.75rem,1vw,1rem)] ${
            status === 'success' ? 'text-navy' : 'text-primary'
          }`}
        >
          {message}
        </p>
      ) : null}

      <p className="sr-only">{APPOINTMENT_HEADING.label} form</p>
    </div>
  )
}
