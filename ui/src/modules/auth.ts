import { createSlice } from '@reduxjs/toolkit'
import { axios, clearAuthData, hasAuthData } from '../axios'
import { StoreDispatch, StoreGetState } from '../store'
import Axios from 'axios'

type AuthState = {
  loggedIn: boolean,
  error: null,
  loading: boolean,
}

const INITIAL_STATE: AuthState = {
  loggedIn: hasAuthData(),
  error: null,
  loading: false,
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login(state) {
      return {
        ...state,
        loggedIn: true,
        error: null,
        loading: false,
      }
    },
    logout() {
      return {
        loggedIn: false,
        error: null,
        loading: false,
      }
    },
    error(state, { payload: error }) {
      return {
        ...state,
        error,
        loading: false,
      }
    },
    loading(state) {
      return {
        ...state,
        loading: true,
      }
    },
  },
})

export const auth = reducer

export function requestLogout() {
  return async (dispatch: StoreDispatch) => {
    dispatch(actions.loading())
    await axios.post('/api/auth/logout')
    clearAuthData()
  }
}

export function ensureLoggedOut() {
  return (dispatch: StoreDispatch, getState: StoreGetState) => {
    const { auth } = getState()

    if (auth.loggedIn) {
      dispatch(actions.logout())
    }
  }
}

export function login({ username, password, otp }: { username: string, password: string, otp: string }) {
  return async (dispatch: StoreDispatch) => {
    try {
      dispatch(actions.loading())
      await axios.post('/api/auth/login', { username, password, otp })
      dispatch(actions.login())
    } catch (err) {
      console.error(err)
      if (Axios.isAxiosError(err)) {
        dispatch(actions.error({
          message: err.message,
          reason: err.response?.data && (err.response.data.reason || err.response.data.error_description),
        }))
      } else {
        dispatch(actions.error({
          message: 'Unknown error',
          reason: undefined,
        }))
      }
    }
  }
}
