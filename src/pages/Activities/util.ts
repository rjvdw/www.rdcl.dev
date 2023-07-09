import { addDays, differenceInDays, isThisWeek, startOfWeek } from 'date-fns'
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

const WEEK_OPTIONS = { weekStartsOn: 1 } as const

export function formatDateTime(
  activity: Activity,
  key: 'starts' | 'ends',
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

export function formatDate(date: Date): string
export function formatDate(date: string): string
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return DATE_FORMATTER.format(date)
}

export function formatUrl(url: string): string {
  return new URL(url).host
}

export function dateFuzzer(activity: Activity): string | undefined {
  const starts = new Date(Date.parse(activity.starts))
  const ends = activity.ends ? new Date(Date.parse(activity.ends)) : starts
  const now = new Date()

  if (starts <= now && now <= ends) {
    return 'In progress'
  }

  convertToDay(starts)
  convertToDay(now)
  const diff = differenceInDays(starts, now)

  if (diff === 0) {
    return 'Today'
  }

  if (diff === 1) {
    return 'Tomorrow'
  }

  if (isThisWeek(starts, WEEK_OPTIONS)) {
    return 'This week'
  }

  if (isNextWeek(starts, WEEK_OPTIONS)) {
    return 'Next week'
  }
}

function convertToDay(date: Date) {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

function isNextWeek(
  date: Date,
  options: Parameters<typeof startOfWeek>[1],
): boolean {
  const nextWeek = addDays(new Date(), 7)
  const w1 = startOfWeek(nextWeek, options)
  const w2 = addDays(w1, 7)

  return w1 <= date && date < w2
}
