import { createSlice } from '@reduxjs/toolkit'
import { StoreState } from '../store'

export type UserData = {
  id: string,
  email: string,
  role: string,
  meta: {
    avatar: string | undefined,
    name: string | undefined,
  },
}

type UnauthenticatedState = {
  authenticated: false,
}

type AuthenticatedState = {
  authenticated: true,
  user: UserData,
}

type AuthState = UnauthenticatedState | AuthenticatedState

const INITIAL_STATE: AuthState = {
  authenticated: false,
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE as AuthState,
  reducers: {
    setAuthenticated(_state, { payload: userData }) {
      return {
        authenticated: true,
        user: userData as UserData,
      }
    },
    setUnauthenticated() {
      return {
        authenticated: false,
      }
    }
  },
})

export const auth = reducer
export const { setAuthenticated, setUnauthenticated } = actions

export const selectIsLoggedIn = (state: StoreState) => state.auth.authenticated
export const selectUser = (state: StoreState) => state.auth.authenticated
  ? state.auth.user
  : null
