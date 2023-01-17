import { Activity } from './types'

const LOCALE = 'en-US'
const DATE_TIME_FORMATTER = Intl.DateTimeFormat(LOCALE, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weekday: 'short',
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
})
const DATE_FORMATTER = Intl.DateTimeFormat(LOCALE, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weekday: 'short',
})

export function formatDateTime(
  activity: Activity,
  key: 'starts' | 'ends'
): string {
  const value = activity[key]
  if (value) {
    const date = new Date(Date.parse(value))
    const formatter = activity.allDay ? DATE_FORMATTER : DATE_TIME_FORMATTER

    return formatter.format(date)
  } else {
    return ''
  }
}

export function formatUrl(url: string): string {
  return new URL(url).host
}
