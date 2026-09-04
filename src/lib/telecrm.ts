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

/**
 * Sends appointment leads to TeleCRM Async API.
 * Credentials come from Vite env vars (never hardcode tokens in source).
 *
 * Endpoint pattern:
 * POST https://next-api.telecrm.in/enterprise/{enterpriseId}/autoupdatelead
 * Authorization: Bearer {token}
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

  const endpoint = `https://next-api.telecrm.in/enterprise/${enterpriseId}/autoupdatelead`

  const body = {
    fields: {
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      Treatment: payload.treatment,
      'Preferred Date': payload.preferredDate,
      Source: 'Website Landing Page',
    },
    actions: [
      {
        type: 'SYSTEM_NOTE',
        text: `Appointment request from website — Treatment: ${payload.treatment}, Preferred date: ${payload.preferredDate}`,
      },
    ],
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

    if (!response.ok) {
      const message =
        parseTeleCrmError(text) ||
        `Could not submit request (${response.status}). Please try again or call us.`

      if (import.meta.env.DEV) {
        console.error('[TeleCRM]', response.status, text || '(empty body)')
      }

      return { ok: false, message }
    }

    // Async API returns 200 with { "status": "QUEUED" } — receipt only, not processing outcome.
    if (text) {
      try {
        const parsed = JSON.parse(text) as { status?: string }
        if (parsed.status === 'QUEUED') {
          return { ok: true }
        }
      } catch {
        // Non-JSON 200 — treat as success (fire-and-forget endpoint).
      }
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
