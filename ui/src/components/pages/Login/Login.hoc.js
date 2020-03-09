import { connect } from 'react-redux'
import { Login as LoginComponent } from './Login.component'
import { login, logout } from '../../../modules/auth'

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
    logout() {
      dispatch(logout())
    },
  }),
)(LoginComponent)
