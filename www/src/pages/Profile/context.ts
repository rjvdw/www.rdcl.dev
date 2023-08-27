import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import { errorAsString } from '../../util/errors'
import { getBody, useApi } from '../../util/http'
import { isUserProfile, UserProfile } from './types'

type InitialState = {
  state: 'initial'
}

type LoadingState = {
  state: 'loading'
}

type ErrorState = {
  state: 'error'
  error: string
}

type CompleteState = {
  state: 'complete'
  profile: UserProfile
}

type ProfileContext = (
  | InitialState
  | LoadingState
  | ErrorState
  | CompleteState
) & {
  mode: 'view' | 'edit'
  update(this: void, profile: UserProfile): void
  setMode(this: void, mode: ProfileContext['mode']): void
}

const PCtx = createContext<ProfileContext>({
  state: 'initial',
  mode: 'view',
  update() {
    throw new Error('missing required provider')
  },
  setMode() {
    throw new Error('missing required provider')
  },
})

export const Provider = PCtx.Provider

export function useSetupContext(): ProfileContext {
  const [value, setValue] = useState<ProfileContext>({
    state: 'initial',
    mode: 'view',
    update(profile: UserProfile) {
      setValue((v) => ({
        state: 'complete',
        profile,
        mode: v.mode,
        update: v.update,
        setMode: v.setMode,
      }))
    },
    setMode(mode) {
      setValue((v) => ({ ...v, mode }))
    },
  })
  const api = useApi(true)

  useEffect(() => {
    setValue((v) => ({
      state: 'loading',
      mode: v.mode,
      update: v.update,
      setMode: v.setMode,
    }))
    api
      .get('/auth/me')
      .then((response) => getBody(response, isUserProfile))
      .then((profile) =>
        setValue((v) => ({
          state: 'complete',
          profile,
          mode: v.mode,
          update: v.update,
          setMode: v.setMode,
        })),
      )
      .catch((error) =>
        setValue((v) => ({
          state: 'error',
          error: errorAsString(error),
          mode: v.mode,
          update: v.update,
          setMode: v.setMode,
        })),
      )
  }, [api])

  return value
}

export function useProfileContext(): ProfileContext {
  return useContext(PCtx)
}
