export function fail(status, reason) {
  return { status, data: { reason } }
}

export function success(data) {
  return { status: 200, data }
}
