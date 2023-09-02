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
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false,
      },
    )
  },

  date(
    this: void,
    value?: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    if (value === undefined) return ''

    return asDate(value).toLocaleString(
      document.documentElement.lang,
      options ?? {
        dateStyle: 'medium',
        hour12: false,
      },
    )
  },

  time(
    this: void,
    value?: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    if (value === undefined) return ''

    return asDate(value).toLocaleString(
      document.documentElement.lang,
      options ?? {
        timeStyle: 'medium',
        hour12: false,
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
