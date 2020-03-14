import { createSlice } from '@reduxjs/toolkit'
import { axios, clearAuthData, hasAuthData } from '../axios'

export const { actions, reducer: auth } = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login(state) {
      return {
        ...state,
        loggedIn: true,
      }
    },
    logout() {
      return {
        loggedIn: false,
      }
    }
  },
})

export function requestLogout() {
  return async () => {
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
      const response = await axios.post('/auth/login', { username, password, otp })
      console.log(response)
      dispatch(actions.login())
    } catch (err) {
      console.error(err)
    }
  }
}

function getInitialState() {
  if (hasAuthData()) {
    return { loggedIn: true }
  }

  return { loggedIn: false }
}
