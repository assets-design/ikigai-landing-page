type AppointmentPayload = {
  name: string
  phone: string
  treatment: string
  preferredDate: string
}

type TeleCrmResponse = {
  ok: boolean
  message?: string
}

const TELECRM_ERROR_MESSAGES: Record<string, string> = {
  ENTERPRISE_LICENSE_EXPIRED:
    'Our appointment system is temporarily unavailable. Please call us directly to book.',
  INVALID_TOKEN:
    'Could not submit request. Please try again or call us to book.',
  UNAUTHORIZED:
    'Could not submit request. Please try again or call us to book.',
  NOT_AUTHORIZED:
    'Could not submit request. Please try again or call us to book.',
  INVALID_LEAD:
    'Could not submit request. Please check your details and try again.',
  VALIDATION_ERROR:
    'Could not submit request. Please check your details and try again.',
  BAD_REQUEST:
    'Could not submit request. Please try again or call us to book.',
}

function parseTeleCrmError(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    return ''
  }

  try {
    const parsed = JSON.parse(trimmed) as {
      error?: string | { code?: string; message?: string }
      message?: string
    }
    const errorField = parsed.error
    const code =
      typeof errorField === 'object' && errorField !== null
        ? (errorField.code ?? errorField.message)
        : (errorField ?? parsed.message)
    if (code && TELECRM_ERROR_MESSAGES[code]) {
      return TELECRM_ERROR_MESSAGES[code]
    }
    if (code) {
      return code.replace(/_/g, ' ').toLowerCase()
    }
  } catch {
    // Not JSON — fall through to raw text.
  }

  return trimmed
}

function buildLeadFields(payload: AppointmentPayload) {
  return {
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    Treatment: payload.treatment,
    'Preferred Date': payload.preferredDate,
    Source: 'Website Landing Page',
  }
}

/**
 * Sends appointment leads to TeleCRM Sync API.
 * Credentials come from Vite env vars (never hardcode tokens in source).
 *
 * Endpoint:
 * POST https://next.telecrm.in/autoupdate/v2/enterprise/{enterpriseId}/lead
 * Authorization: Bearer {syncToken}
 *
 * Docs: https://docs.telecrm.in/sync-api/leads/create
 */
export async function submitAppointmentToTeleCrm(
  payload: AppointmentPayload,
): Promise<TeleCrmResponse> {
  const enterpriseId = import.meta.env.VITE_TELECRM_ENTERPRISE_ID as
    | string
    | undefined
  const token = import.meta.env.VITE_TELECRM_TOKEN as string | undefined

  if (!enterpriseId || !token) {
    return {
      ok: false,
      message:
        'TeleCRM is not configured. Add VITE_TELECRM_ENTERPRISE_ID and VITE_TELECRM_TOKEN to your .env file.',
    }
  }

  const endpoint = `https://next.telecrm.in/autoupdate/v2/enterprise/${enterpriseId}/lead`

  const body = {
    fields: buildLeadFields(payload),
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const text = await response.text().catch(() => '')

    // Lead already exists — treat as success so returning visitors still reach thank-you.
    if (response.status === 409) {
      return { ok: true }
    }

    if (!response.ok) {
      const message =
        parseTeleCrmError(text) ||
        `Could not submit request (${response.status}). Please try again or call us.`

      if (import.meta.env.DEV) {
        console.error('[TeleCRM]', response.status, text || '(empty body)')
      }

      return { ok: false, message }
    }

    // Sync create returns 201 with { lead_id, actions?, remarks? }
    if (response.status === 201 || response.status === 200) {
      return { ok: true }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      message:
        'Network error while submitting. Please check your connection and try again.',
    }
  }
}
