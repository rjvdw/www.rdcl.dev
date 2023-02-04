import { useCallback, useEffect, useMemo, useState } from 'react'
import { errorAsString } from './errors'

export type AsyncLoadResult<T> = {
  data?: T
  setData(value: T): void
  loading: boolean
  errors: string[]
  refresh(): void
}

export const useAsyncLoad = <T>(
  action: (init?: RequestInit) => Promise<T>
): AsyncLoadResult<T> => {
  const [data, setData] = useState<T>()
  const [nrLoading, setNrLoading] = useState<number>(0)
  const [errors, setErrors] = useState<[symbol, string][]>([])

  const load = useCallback(
    async (init?: RequestInit) => {
      const identifier = Symbol()
      try {
        setNrLoading((nr) => nr + 1)
        setData(await action(init))
        setErrors([])
      } catch (err) {
        setErrors((errs) =>
          errs
            .filter(([i]) => i === identifier) // clear out errors from other attempts
            .concat([[identifier, errorAsString(err)]])
        )
      } finally {
        setNrLoading((nr) => nr - 1)
      }
    },
    [action]
  )

  useEffect(() => {
    const abortController = new AbortController()
    load({ signal: abortController.signal })

    return () => abortController.abort()
  }, [load])

  const errorsWithoutIdentifiers = useMemo(
    () => errors.map(([, e]) => e),
    [errors]
  )

  return {
    data,
    setData,
    loading: nrLoading > 0,
    errors: errorsWithoutIdentifiers,
    refresh: load,
  }
}
