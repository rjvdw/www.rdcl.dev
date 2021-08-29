import { connect } from 'react-redux'
import { Botw as BotwComponent } from './Botw.component'
import { StoreState } from '../../../store'

export const Botw = connect(
  ({ botw }: StoreState) => botw,
)(BotwComponent)
