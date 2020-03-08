import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'

export const App = connect(
  ({ screen }) => ({
    screenType: screen.type,
  }),
)(AppComponent)
