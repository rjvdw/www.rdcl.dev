export const fmt = {
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
