import { createSlice } from '@reduxjs/toolkit'
import { axios } from '../axios'

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

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('auth')
    dispatch(actions.logout())
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
      dispatch(logout())
      throw new Error('todo')
    }
  }
}

function getInitialState() {
  const data = window.localStorage.getItem('auth')

  if (data) {
    try {
      const { accessToken } = JSON.parse(data)
      return { loggedIn: !!accessToken }
    } catch (err) {
      window.localStorage.removeItem('auth')
    }
  }

  return { loggedIn: false }
}
