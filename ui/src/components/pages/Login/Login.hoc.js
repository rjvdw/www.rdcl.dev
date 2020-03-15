import { connect } from 'react-redux'
import { Login as LoginComponent } from './Login.component'
import { login, requestLogout } from '../../../modules/auth'

export const Login = connect(
  ({ auth }) => ({
    loggedIn: auth.loggedIn,
    error: auth.error,
    loading: auth.loading,
  }),

  dispatch => ({
    login(username, password, otp) {
      return dispatch(login({
        username,
        password,
        otp,
      }))
    },
    logout() {
      dispatch(requestLogout())
    },
  }),
)(LoginComponent)
