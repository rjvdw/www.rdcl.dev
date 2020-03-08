import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'
import { open } from '../../modules/sidemenu'

export const App = connect(
  ({ routes, screen }) => ({
    screenType: screen.type,
  }),

  dispatch => ({
    openSidemenu() {
      dispatch(open())
    },
  }),
)(AppComponent)
