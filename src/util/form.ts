import { useCallback, useId } from 'preact/hooks'

interface FormSubmitEvent extends SubmitEvent {
  target: HTMLFormElement
}

/**
 * Checks whether the received event is actually a SubmitEvent on a HTMLFormElement.
 *
 * This should not be necessary, but due to preact's typings, this check is needed for everything to work.
 */
export function isFormSubmitEvent(event: Event): event is FormSubmitEvent {
  return event.type === 'submit' && event.target instanceof HTMLFormElement
}

export function useFormId() {
  const id = useId()

  return useCallback((field: string) => `${id}:${field}`, [id])
}

type Converters = {
  number(this: void, value: string): number | undefined
}

export const convert: Converters = {
  number(value) {
    if (value === '') return undefined
    const nr = Number(value)
    return isNaN(nr) ? undefined : nr
  },
}
