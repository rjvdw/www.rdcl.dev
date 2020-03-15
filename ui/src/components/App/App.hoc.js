import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'

export const App = connect(
  ({ auth }) => ({
    loggedIn: auth.loggedIn,
  }),
)(AppComponent)
