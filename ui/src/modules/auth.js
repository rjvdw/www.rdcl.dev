import { createSlice } from '@reduxjs/toolkit'

export const { actions, reducer: auth } = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login(state, { payload: jwtData }) {
      return {
        ...state,
        loggedIn: true,
        accessToken: jwtData.accessToken,
        refreshToken: jwtData.refreshToken,
        accessTokenExpires: jwtData.accessTokenExpires,
        refreshTokenExpires: jwtData.refreshTokenExpires,
      }
    },
    logout() {
      return {
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        accessTokenExpires: null,
        refreshTokenExpires: null,
      }
    }
  },
})

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('auth')
    dispatch(actions.logout())
  }
}

export function login({ username, password, otp }) {
  return async (dispatch) => {
    const now = Date.now()

    const response = await fetch('/.netlify/functions/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, otp }),
    })

    const data = await response.json()
    if (response.ok) {
      dispatch(processResponse(now, data))
      return null
    } else {
      console.error(data)
      dispatch(logout())
      return data.error_description || 'unknown error'
    }
  }
}

export function refresh() {
  return async (dispatch, getState) => {
    const now = Date.now()
    const state = getState().auth

    if (!state.refreshToken || state.refreshToken < now) {
      dispatch(logout())
      return 'session expired'
    }

    const response = await fetch('/.netlify/functions/auth/refresh', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: state.refreshToken }),
    })

    const data = await response.json()
    if (response.ok) {
      dispatch(processResponse(now, data))
      return null
    } else {
      console.error(data)
      dispatch(logout())
      return data.error_description || 'unknown error'
    }
  }
}

function processResponse(now, data) {
  const loginData = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    accessTokenExpires: now + data.expires_in,
    refreshTokenExpires: now + data.refresh_expires_in,
  }
  window.localStorage.setItem('auth', JSON.stringify(loginData))
  return actions.login(loginData)
}

function getInitialState() {
  const data = window.localStorage.getItem('auth')

  if (data) {
    const { accessToken, refreshToken } = JSON.parse(data)

    return {
      loggedIn: true,
      accessToken,
      refreshToken,
    }
  }

  return {
    loggedIn: false,
    accessToken: null,
    refreshToken: null,
    accessTokenExpires: null,
    refreshTokenExpires: null,
  }
}
