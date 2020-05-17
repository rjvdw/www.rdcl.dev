import { connect } from 'react-redux'
import { Botw as BotwComponent } from './Botw.component'

export const Botw = connect(
  ({ botw }) => botw,
)(BotwComponent)
