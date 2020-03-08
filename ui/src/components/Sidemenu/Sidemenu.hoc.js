import { connect } from 'react-redux'
import { Sidemenu as SidemenuComponent } from './Sidemenu.component'
import { close, toggle } from '../../modules/sidemenu'

export const Sidemenu = connect(
  ({ routes, screen, sidemenu }) => ({
    collapsed: screen.type === 'mobile' ? !sidemenu.open : sidemenu.collapsed,
    activeRoute: routes.activeRoute,
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
