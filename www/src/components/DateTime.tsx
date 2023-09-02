import { fmt } from '../util/format'

type DateTimeProps = {
  value: string | Date
  mode?: 'datetime' | 'date' | 'time'
  options?: Intl.DateTimeFormatOptions
}

export const DateTime = ({
  value,
  mode = 'datetime',
  options,
}: DateTimeProps) => (
  <time value={asIso(value)}>
    {mode === 'date'
      ? fmt.date(value, options)
      : mode === 'time'
      ? fmt.time(value, options)
      : fmt.dateTime(value, options)}
  </time>
)

function asIso(value: string | Date): string {
  if (value instanceof Date) return value.toISOString()
  return value
}
