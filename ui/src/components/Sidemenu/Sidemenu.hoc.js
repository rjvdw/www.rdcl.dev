import { connect } from 'react-redux'
import { Sidemenu as SidemenuComponent } from './Sidemenu.component'
import { toggle } from '../../modules/sidemenu'

export const Sidemenu = connect(
  ({ sidemenu }) => ({
    collapsed: sidemenu.collapsed,
  }),

  dispatch => ({
    toggle() {
      dispatch(toggle())
    },
  }),
)(SidemenuComponent)
