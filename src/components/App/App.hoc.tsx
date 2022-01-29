import { connect } from 'react-redux'
import { App as AppComponent } from './App.component'
import { StoreState } from '../../store'

export const App = connect(
  ({ screen }: StoreState) => ({
    screenType: screen.type,
  }),
)(AppComponent)
