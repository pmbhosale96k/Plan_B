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
