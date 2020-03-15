import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'

export const App = connect(
  ({ auth, screen }) => ({
    loggedIn: auth.loggedIn,
    screenType: screen.type,
  }),
)(AppComponent)
