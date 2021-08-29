import { connect } from 'react-redux'
import { Sidemenu as SidemenuComponent } from './Sidemenu.component'
import { close, toggle } from '../../modules/sidemenu'
import { StoreState } from '../../store'

export const Sidemenu = connect(
  ({ auth, routes, screen, sidemenu }: StoreState) => ({
    collapsed: screen.type === 'mobile' ? !sidemenu.open : sidemenu.collapsed,
    activeRoute: routes.activeRoute,
    loggedIn: auth.loggedIn,
  }),

  dispatch => ({
    toggle() {
      // @ts-ignore
      dispatch(toggle())
    },

    close() {
      dispatch(close())
    },
  }),
)(SidemenuComponent)
