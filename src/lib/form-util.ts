export function isInputField(
  el: unknown,
): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  )
}

export function getInputFieldById(id: string) {
  const el = document.getElementById(id)
  if (!isInputField(el)) {
    throw new Error(`Element #${id} is not a valid input field`)
  }
  return el
}

export const InputParser = {
  numeric(value: string): number | null {
    return value === '' ? null : +value
  },
}

export const InputFormatter = {
  numeric(value: number | null): string {
    if (value === null) return ''
    if (Number.isFinite(value)) return value.toLocaleString()
    return '∞'
  },
}
