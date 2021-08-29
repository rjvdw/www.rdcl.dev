import { connect } from 'react-redux'
import { Login as LoginComponent } from './Login.component'
import { login, requestLogout } from '../../../modules/auth'
import { StoreState } from '../../../store'

export const Login = connect(
  ({ auth }: StoreState) => ({
    loggedIn: auth.loggedIn,
    error: auth.error,
    loading: auth.loading,
  }),

  dispatch => ({
    login(username: string, password: string, otp: string) {
      // @ts-ignore
      return dispatch(login({
        username,
        password,
        otp,
      }))
    },
    logout() {
      // @ts-ignore
      dispatch(requestLogout())
    },
  }),
)(LoginComponent)
