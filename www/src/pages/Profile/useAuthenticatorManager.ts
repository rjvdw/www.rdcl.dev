import { useCallback, useMemo, useState } from 'preact/hooks'
import { errorAsString } from '../../util/errors'
import { useAuthenticatorApi } from './api'
import { useRefresh } from './context'
import { Authenticator } from './types'

type UseAuthenticatorManagerReturn = {
  adding: boolean
  error?: string
  add(this: void): void
  update(this: void, authenticator: Authenticator): void
  remove(this: void, authenticator: Authenticator): void
}

export function useAuthenticatorManager(): UseAuthenticatorManagerReturn {
  const refresh = useRefresh()
  const api = useAuthenticatorApi()
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string>()

  const add = useCallback(() => {
    setAdding(true)
    api
      .add()
      .then(() => {
        refresh()
      })
      .catch((err) => {
        setError(errorAsString(err))
      })
      .finally(() => {
        setAdding(false)
      })
  }, [api])

  const update = useCallback(
    (authenticator: Authenticator) => {
      api.update(authenticator).then(
        () => {
          refresh()
        },
        (err) => {
          setError(errorAsString(err))
        },
      )
    },
    [api],
  )

  const remove = useCallback(
    (authenticator: Authenticator) => {
      api.delete(authenticator).then(
        () => {
          refresh()
        },
        (err) => {
          setError(errorAsString(err))
        },
      )
    },
    [api],
  )

  return useMemo(
    () => ({ adding, error, add, update, remove }),
    [adding, error, add, update, remove],
  )
}
