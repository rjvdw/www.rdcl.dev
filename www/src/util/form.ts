import { Inputs, useCallback, useId, useMemo, useState } from 'preact/hooks'
import { errorAsString } from './errors'

export interface FormSubmitEvent extends SubmitEvent {
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
  date(this: void, value: FormDataEntryValue | null): Date | undefined
  number(this: void, value: FormDataEntryValue | null): number | undefined
}

export const convert: Converters = {
  date(value) {
    if (typeof value !== 'string' || value === '') return undefined
    return new Date(Date.parse(value))
  },

  number(value) {
    if (value === '') return undefined
    const nr =
      typeof value === 'string'
        ? Number(value.replace(/,/, '.'))
        : Number(value)
    return isNaN(nr) ? undefined : nr
  },
}

export type UseFormHandlerReturn = {
  onSubmit(this: void, event: Event): void
  error?: string
}

export type FormHandler = (
  event: FormSubmitEvent,
  additional: {
    setError(this: void, error: string | undefined): void
  },
) => void | Promise<void>

export function useFormHandler(
  handler: FormHandler,
  dependencies: Inputs,
): UseFormHandlerReturn {
  const [error, setError] = useState<string>()

  const memoizedHandler = useCallback(handler, dependencies)

  return useMemo(
    () => ({
      error,
      onSubmit: useCallback(
        (event) => {
          event.preventDefault()

          if (!isFormSubmitEvent(event)) {
            setError('Unexpected error handling the form submit')
            return
          }

          const result = memoizedHandler(event, {
            setError,
          })

          if (isPromise(result)) {
            result.catch((err) => setError(errorAsString(err)))
          }
        },
        [memoizedHandler],
      ),
    }),
    [handler],
  )
}

function isPromise(value: unknown): value is Promise<unknown> {
  if (!value) return false

  return (value as Promise<unknown>).then !== undefined
}
