export function errorAsString(err: unknown, logError = true): string {
  if (logError) {
    console.error(err)
  }

  if (err instanceof Error) {
    return err.message
  }

  return String(err)
}
