import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import { errorAsString } from '../../util/errors'
import { Api, getBody, useApi } from '../../util/http'
import { isUserProfile, UserProfile } from './types'

type InitialState = {
  type: 'initial'
}

type LoadingState = {
  type: 'loading'
}

type ErrorState = {
  type: 'error'
  error: string
}

type CompleteState = {
  type: 'complete'
  profile: UserProfile
}

type ProfileContext = {
  mode: 'view' | 'edit'
  update(this: void, profile: UserProfile): void
  setMode(this: void, mode: ProfileContext['mode']): void
  refresh(this: void): void
  state: InitialState | LoadingState | ErrorState | CompleteState
}

const PCtx = createContext<ProfileContext>(null as unknown as ProfileContext)

export const Provider = PCtx.Provider

export function useSetupContext(): ProfileContext {
  const [value, setValue] = useState<ProfileContext>({
    state: { type: 'initial' },
    mode: 'view',
    update(profile: UserProfile) {
      setValue((v) => ({
        ...v,
        state: {
          type: 'complete',
          profile,
        },
      }))
    },
    setMode(mode) {
      setValue((v) => ({ ...v, mode }))
    },
    refresh() {
      setValue((v) => ({
        ...v,
        state: { type: 'initial' },
      }))
    },
  })
  const api = useApi(true)

  useEffect(() => {
    if (value.state.type === 'initial') {
      setValue((v) => ({
        ...v,
        state: { type: 'loading' },
      }))

      loadProfile(api).then(
        (profile) =>
          setValue((v) => ({
            ...v,
            state: {
              type: 'complete',
              profile,
            },
          })),
        (error) =>
          setValue((v) => ({
            ...v,
            state: {
              type: 'error',
              error: errorAsString(error),
            },
          })),
      )
    }
  }, [value.state.type, api])

  return value
}

export function useProfileContext(): ProfileContext {
  return useContext(PCtx)
}

export function useRefresh() {
  return useContext(PCtx).refresh
}

async function loadProfile(api: Api): Promise<UserProfile> {
  const response = await api.get('/auth/me')

  return getBody(response, isUserProfile)
}
