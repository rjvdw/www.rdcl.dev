import { useCallback, useEffect, useState } from 'react'
import { errorAsString } from './errors'

export type AsyncLoadResult<T> = {
  data?: T
  setData(value: T): void
  loading: boolean
  error?: string
  refresh(): void
}

export const useAsyncLoad = <T>(
  action: () => Promise<T>
): AsyncLoadResult<T> => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setData(await action())
      setError(undefined)
    } catch (err) {
      setError(errorAsString(err))
    } finally {
      setLoading(false)
    }
  }, [action])

  useEffect(() => {
    load()
  }, [load])

  return {
    data,
    setData,
    loading,
    error,
    refresh: load,
  }
}
