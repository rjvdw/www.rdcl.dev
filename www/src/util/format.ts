export const LOCALE = undefined

export const fmt = {
  date(this: void, value?: Date, options?: Intl.DateTimeFormatOptions): string {
    if (value === undefined) return ''

    return value.toLocaleDateString(
      LOCALE,
      options ?? {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
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
      LOCALE,
      options ?? {
        maximumFractionDigits: 1,
      },
    )
  },
} as const
