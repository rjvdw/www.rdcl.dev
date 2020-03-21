import { connect } from 'react-redux'
import { Health as HealthComponent } from './Health.component'
import { clearErrors, load, save, unload } from '../../../modules/health'

export const Health = connect(
  ({ health }) => ({
    ...health,
  }),

  dispatch => ({
    clearErrors() {
      return dispatch(clearErrors())
    },

    load(from, to) {
      return dispatch(load(from, to))
    },

    unload() {
      return dispatch(unload())
    },

    save(entry) {
      return dispatch(save(entry))
    },
  }),
)(HealthComponent)
