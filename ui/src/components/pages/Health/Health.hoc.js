import { connect } from 'react-redux'
import { Health as HealthComponent } from './Health.component'
import { clearErrors, load, save, remove, selectData, selectWeightGraphData, unload } from '../../../modules/health'

export const Health = connect(
  ({ health }) => ({
    loading: health.loading,
    saving: health.saving,
    removing: health.removing,
    data: selectData(health),
    graphData: selectWeightGraphData(health),
    actualFrom: health.from,
    actualTo: health.to,
    errors: health.errors,
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

    remove(key) {
      return dispatch(remove(key))
    },
  }),
)(HealthComponent)
