import { connect } from 'react-redux'
import { ConnectFour as ConnectFourComponent } from './ConnectFour.component'
import { board, move, reset } from '../../../modules/connectFour'
import { StoreState } from '../../../store'

export const ConnectFour = connect(
  ({ connectFour }: StoreState) => ({
    ...connectFour,
    board: board(connectFour),
  }),

  dispatch => ({
    reset() {
      dispatch(reset())
    },
    move(col: number) {
      dispatch(move(col))
    },
  }),
)(ConnectFourComponent)
