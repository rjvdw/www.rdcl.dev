import { connect } from 'react-redux'
import { PageHeader as PageHeaderComponent } from './PageHeader.component'
import { open } from '../../modules/sidemenu'

export const PageHeader = connect(
  () => ({}),

  dispatch => ({
    open() {
      dispatch(open())
    },
  }),
)(PageHeaderComponent)
