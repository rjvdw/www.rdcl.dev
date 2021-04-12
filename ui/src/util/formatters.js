import { format, parseISO } from 'date-fns'
import nl from 'date-fns/locale/nl'

export function formatDate(value) {
  if (value) {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, 'PP', { locale: nl })
  } else {
    return ''
  }
}

export function formatDateTime(value) {
  if (value) {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, 'PPp', { locale: nl })
  } else {
    return ''
  }
}
