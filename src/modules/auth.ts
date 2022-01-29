import { createSlice } from '@reduxjs/toolkit'
import { StoreDispatch } from '../store'
import { auth as authProvider } from '../auth'

export type AuthData = {
  id: string,
  email: string,
  token: {
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number,
    expires_at: number,
  },
  metadata: object,
}

type UnauthenticatedState = {
  authenticated: false,
}

type AuthenticatedState = {
  authenticated: true,
} & AuthData

type AuthState = UnauthenticatedState | AuthenticatedState

const INITIAL_STATE: AuthState = {
  authenticated: false,
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setAuthenticated(_state, { payload }) {
      return {
        authenticated: true,
        ...payload,
      }
    },
    setUnauthenticated(_state) {
      return {
        authenticated: false,
      }
    }
  },
})

export const auth = reducer

export function setAuthenticated(authData: AuthData) {
  return (dispatch: StoreDispatch) => {
    dispatch(actions.setAuthenticated(authData))
  }
}

export function login(email: string, password: string, remember: boolean) {
  return async (dispatch: StoreDispatch) => {
    const response = await authProvider.login(email, password, remember)
    dispatch(actions.setAuthenticated({
      id: response.id,
      email: response.email,
      token: response.token,
      metadata: response.user_metadata,
    }))
  }
}

export function logout() {
  return async (dispatch: StoreDispatch) => {
    await authProvider.currentUser()?.logout()
    dispatch(actions.setUnauthenticated())
  }
}
