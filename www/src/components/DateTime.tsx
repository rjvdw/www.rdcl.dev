import { computed } from '@preact/signals'
import { useMemo } from 'preact/hooks'
import { settings } from '../state/settings'

type DateTimeProps = {
  value: string | Date
  mode?: 'datetime' | 'date' | 'time'
}

const dateSettings = computed<Intl.DateTimeFormatOptions>(() => ({
  dateStyle: settings.value?.dateStyle,
}))

const timeSettings = computed<Intl.DateTimeFormatOptions>(() => ({
  timeStyle: settings.value?.timeStyle,
  hour12: settings.value?.hour12,
}))

export const DateTime = ({ value, mode = 'datetime' }: DateTimeProps) => {
  const { iso, formatted } = useDateTime(value, mode)

  return <time value={iso}>{formatted}</time>
}

function useDateTime(
  value: DateTimeProps['value'],
  mode: DateTimeProps['mode'],
) {
  const date = useMemo(() => asDate(value), [value])

  const options: Intl.DateTimeFormatOptions = useMemo(() => {
    if (mode === 'datetime') {
      return {
        ...dateSettings.value,
        ...timeSettings.value,
      }
    }

    if (mode === 'date') {
      return dateSettings.value
    }

    return timeSettings.value
  }, [mode, dateSettings.value, timeSettings.value])

  return useMemo(
    () => ({
      iso: date.toISOString(),
      formatted: date.toLocaleString(document.documentElement.lang, options),
    }),
    [date, options],
  )
}

function asDate(value: string | Date): Date {
  if (value instanceof Date) {
    return value
  }
  return new Date(value)
}
