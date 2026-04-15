export function extractPayload(response) {
  const body = response?.data

  if (Array.isArray(body)) {
    return body
  }

  if (body?.data !== undefined) {
    return body.data
  }

  if (body?.content !== undefined) {
    return body.content
  }

  return body
}

export function extractMessage(response, fallback = 'Request completed successfully.') {
  const body = response?.data

  return body?.message || body?.data?.message || fallback
}

export function extractToken(response) {
  const body = response?.data

  return body?.token || body?.jwt || body?.data?.token || body?.data?.jwt || ''
}

export function extractErrorMessage(error, fallback, unavailableFallback = fallback) {
  const status = error?.response?.status

  if (status === 404 || status === 405 || status === 501) {
    return unavailableFallback
  }

  return error?.response?.data?.message || error?.message || fallback
}
