export const LOCALE = undefined

export const fmt = {
  dateTime(
    this: void,
    value?: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    if (value === undefined) return ''

    return asDate(value).toLocaleString(
      document.documentElement.lang,
      options ?? {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      },
    )
  },

  date(
    this: void,
    value?: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    if (value === undefined) return ''

    return asDate(value).toLocaleDateString(
      document.documentElement.lang,
      options ?? {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    )
  },

  time(
    this: void,
    value?: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    if (value === undefined) return ''

    return asDate(value).toLocaleDateString(
      document.documentElement.lang,
      options ?? {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      },
    )
  },

  number(
    this: void,
    value?: number,
    options?: Intl.NumberFormatOptions,
  ): string {
    if (value === undefined) return ''

    return value.toLocaleString(
      document.documentElement.lang,
      options ?? {
        maximumFractionDigits: 1,
      },
    )
  },
} as const

function asDate(value: string | Date): Date {
  if (value instanceof Date) {
    return value
  }

  return new Date(value)
}
