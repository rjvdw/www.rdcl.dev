import { connect } from 'react-redux'
import { Health as HealthComponent } from './Health.component'
import {
  clearErrors,
  HealthData,
  load,
  remove,
  save,
  selectData,
  selectWeightGraphData,
  unload
} from '../../../modules/health'
import { StoreState } from '../../../store'

export const Health = connect(
  ({ health }: StoreState) => ({
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

    load(from?: string, to?: string, owner?: string | null) {
      // @ts-ignore
      return dispatch(load(from, to, owner))
    },

    unload() {
      // @ts-ignore
      return dispatch(unload())
    },

    save(entry: HealthData, owner?: string | null) {
      // @ts-ignore
      return dispatch(save(entry, owner))
    },

    remove(key: string, owner?: string | null) {
      // @ts-ignore
      return dispatch(remove(key, owner))
    },
  }),
)(HealthComponent)
