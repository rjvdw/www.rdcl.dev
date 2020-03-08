import { connect } from 'react-redux'
import { Login as LoginComponent } from './Login.component'
import { login, logout, refresh } from '../../../modules/auth'

export const Login = connect(
  ({ auth }) => ({
    loggedIn: auth.loggedIn,
  }),

  dispatch => ({
    login(username, password, otp) {
      return dispatch(login({
        username,
        password,
        otp,
      }))
    },
    refresh() {
      return dispatch(refresh())
    },
    logout() {
      dispatch(logout())
    },
  }),
)(LoginComponent)
