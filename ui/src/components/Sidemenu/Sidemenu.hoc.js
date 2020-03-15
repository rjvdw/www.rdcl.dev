import { connect } from 'react-redux'
import { Sidemenu as SidemenuComponent } from './Sidemenu.component'
import { close, toggle } from '../../modules/sidemenu'

export const Sidemenu = connect(
  ({ auth, routes, screen, sidemenu }) => ({
    collapsed: screen.type === 'mobile' ? !sidemenu.open : sidemenu.collapsed,
    activeRoute: routes.activeRoute,
    loggedIn: auth.loggedIn,
  }),

  dispatch => ({
    toggle() {
      dispatch(toggle())
    },

    close() {
      dispatch(close())
    },
  }),
)(SidemenuComponent)
