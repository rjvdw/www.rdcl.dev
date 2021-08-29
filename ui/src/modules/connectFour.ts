import { createSelector, createSlice } from '@reduxjs/toolkit'

export type ConnectFourState = {
  nrCols: number,
  nrRows: number,
  moves: Array<[number, number]>,
  activePlayer: number,
  invalidMove: boolean,
  gameOver: boolean,
  message: string | null,
  winner: number | null,
}

export type Board = {
  rows: Array<{
    cells: Array<{
      value: number | '',
    }>,
  }>,
}

const INITIAL_STATE: ConnectFourState = {
  nrCols: 7,
  nrRows: 6,
  moves: [],
  activePlayer: 0,
  invalidMove: false,
  gameOver: false,
  message: null,
  winner: null,
}

const { actions, reducer } = createSlice({
  name: 'connectFour',
  initialState: INITIAL_STATE,
  reducers: {
    reset() {
      return INITIAL_STATE
    },

    move(state, { payload: move }) {
      if (state.gameOver) return state

      return verify(state, {
        ...state,
        moves: state.moves.concat([[move, state.activePlayer]]),
        activePlayer: 1 - state.activePlayer,
        invalidMove: false,
      })
    },
  },
})

function verify(previousState: ConnectFourState, state: ConnectFourState) {
  const nrCols = nrColsSelector(state)
  const nrRows = nrRowsSelector(state)
  const cols = colsSelector(state)

  for (const col of cols) {
    if (col.length >= nrCols) {
      return {
        ...previousState,
        invalidMove: true,
      }
    }
  }

  // FIXME: Check if someone has won

  if (state.moves.length === nrCols * nrRows) {
    return {
      ...state,
      gameOver: true,
      winner: null,
    }
  }

  return state
}

export const connectFour = reducer
export const { reset, move } = actions

const nrColsSelector = (state: ConnectFourState) => state.nrCols
const nrRowsSelector = (state: ConnectFourState) => state.nrRows
const movesSelector = (state: ConnectFourState) => state.moves

const colsSelector = createSelector(
  nrColsSelector,
  movesSelector,
  (nrCols, moves) => {
    const cols: Array<number[]> = Array(nrCols).fill(null).map(() => [])
    for (const [col, player] of moves) cols[col].push(player)
    return cols
  },
)

export const board = createSelector(
  nrRowsSelector,
  colsSelector,
  (nrRows, cols): Board => ({
    rows: Array(nrRows).fill(null).map((_, rowIdx) => ({
      cells: cols.map(col => ({
        value: col.length > (nrRows - 1 - rowIdx)
          ? col[nrRows - 1 - rowIdx]
          : '',
      })),
    })),
  }),
)
