import { connect } from 'react-redux'
import { ConnectFour as ConnectFourComponent } from './ConnectFour.component'
import { board, move, reset } from '../../../modules/connectFour'

export const ConnectFour = connect(
  ({ connectFour }) => ({
    ...connectFour,
    board: board(connectFour),
  }),

  dispatch => ({
    reset() {
      dispatch(reset())
    },
    move(col) {
      dispatch(move(col))
    },
  }),
)(ConnectFourComponent)
