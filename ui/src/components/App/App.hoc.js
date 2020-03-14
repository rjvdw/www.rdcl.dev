import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'
import { open } from '../../modules/sidemenu'

export const App = connect(
  ({ screen }) => ({
    screenType: screen.type,
  }),
)(AppComponent)
