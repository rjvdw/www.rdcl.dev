import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'
import { StoreState } from '../../store'

export const App = connect(
  ({ auth, screen }: StoreState) => ({
    loggedIn: auth.loggedIn,
    screenType: screen.type,
  }),
)(AppComponent)
