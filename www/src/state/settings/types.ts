export type UserSettings = {
  dateStyle: Intl.DateTimeFormatOptions['dateStyle']
  timeStyle: Intl.DateTimeFormatOptions['timeStyle']
  hour12: Intl.DateTimeFormatOptions['hour12']
}

export function isUserSettings(data: unknown): data is Partial<UserSettings> {
  return (
    typeof data === 'object' &&
    data !== null &&
    (!('dateStyle' in data) || typeof data.dateStyle === 'string') &&
    (!('timeStyle' in data) || typeof data.timeStyle === 'string') &&
    (!('hour12' in data) || typeof data.hour12 === 'boolean')
  )
}
