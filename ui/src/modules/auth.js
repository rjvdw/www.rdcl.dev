import { createSlice } from '@reduxjs/toolkit'
import { axios, clearAuthData, hasAuthData } from '../axios'

export const { actions, reducer: auth } = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: hasAuthData(),
    error: null,
    loading: false,
  },
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
    error(state, { payload: { error } }) {
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

export function requestLogout() {
  return async (dispatch) => {
    dispatch(actions.loading())
    await axios.post('/auth/logout')
    clearAuthData()
  }
}

export function ensureLoggedOut() {
  return (dispatch, getState) => {
    const { auth } = getState()

    if (auth.loggedIn) {
      dispatch(actions.logout())
    }
  }
}

export function login({ username, password, otp }) {
  return async (dispatch) => {
    try {
      dispatch(actions.loading())
      await axios.post('/auth/login', { username, password, otp })
      dispatch(actions.login())
    } catch (err) {
      dispatch(actions.error(err))
    }
  }
}
