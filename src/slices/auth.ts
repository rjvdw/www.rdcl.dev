import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState, StoreThunk } from '../store'
import { Jwt } from '../util/Jwt'
import { notify } from './notifications'

type AuthState = {
  verificationState?: 'pending' | 'failed' | 'done'
  jwt?: string
}

const INITIAL_STATE: AuthState = {
  jwt: localStorage.jwt,
}

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    pending(state) {
      return {
        ...state,
        verificationState: 'pending',
      }
    },
    failed(state) {
      return {
        ...state,
        verificationState: 'failed',
      }
    },
    done(state, { payload: jwt }: PayloadAction<string>) {
      return {
        jwt,
        verificationState: 'done',
      }
    },
    logout() {
      return {}
    },
  },
})

export const auth = reducer

export const selectJwt = createSelector(
  (state: StoreState) => state.auth.jwt,
  (jwt) => (jwt === undefined ? undefined : new Jwt(jwt)),
)

export const selectIsLoggedIn = createSelector(
  selectJwt,
  (jwt) => !!jwt && !jwt.isExpired(),
)

export const logout = (): StoreThunk => (dispatch) => {
  delete localStorage.jwt
  delete localStorage.sessionToken
  dispatch(actions.logout())
}

export const unauthorized = (): StoreThunk => (dispatch, getState) => {
  const loggedIn = selectIsLoggedIn(getState())
  if (loggedIn) {
    dispatch(logout())
    dispatch(notify('error', 'Your session is invalid. Please log in again.'))
  }
}

export const verify =
  (sessionToken: string, verificationCode: string): StoreThunk =>
  async (dispatch, getState) => {
    try {
      const auth = getState().auth

      if (auth.verificationState) {
        // verification is already in progress, do nothing
        return
      }

      dispatch(actions.pending())

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `session-token=${sessionToken}&verification-code=${verificationCode}`,
        },
      )

      if (response.ok) {
        const { jwt } = await response.json()
        localStorage.jwt = jwt
        delete localStorage.sessionToken
        dispatch(actions.done(jwt))
      } else {
        dispatch(actions.failed())
      }
    } catch (err) {
      dispatch(actions.failed())
    }
  }
