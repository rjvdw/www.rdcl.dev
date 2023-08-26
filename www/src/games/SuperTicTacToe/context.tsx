import { createContext } from 'preact'
import { useCallback, useContext, useMemo, useState } from 'preact/hooks'
import { BOARD_DIM, BOARD_SIZE } from './constants'
import { Coordinate, Move, Player } from './types'

export type GameContext = {
  active: Player
  moves: Move[]
  completedBoards: [Coordinate, Player | undefined][]
  error?: string
  reset(this: void): void
  addMove(this: void, move: Move): void
}

const STTTContext = createContext<GameContext>({
  active: 'x',
  moves: [],
  completedBoards: [],
  error: undefined,
  reset() {
    throw new Error('missing required context provider')
  },
  addMove() {
    throw new Error('missing required context provider')
  },
})

export const Provider = STTTContext.Provider

export function useCreateGameState(): GameContext {
  const [active, setActive] = useState<GameContext['active']>('x')
  const [moves, setMoves] = useState<GameContext['moves']>([])
  const [completedBoards, setCompletedBoards] = useState<
    GameContext['completedBoards']
  >([])
  const [error, setError] = useState<GameContext['error']>()

  return {
    active,
    moves,
    completedBoards,
    error,
    reset() {
      setActive('x')
      setMoves([])
      setCompletedBoards([])
      setError(undefined)
    },
    addMove(move) {
      setError(undefined)
      if (!isLegalMove(moves, move, completedBoards)) {
        setError('invalid move')
        return
      }

      const boardCompletion = getBoardCompletion(moves, move)
      if (boardCompletion !== false) {
        setCompletedBoards((boards) => boards.concat([boardCompletion]))
      }

      setMoves((moves) => moves.concat(move))
      setActive((v) => (v === 'x' ? 'o' : 'x'))
    },
  }
}

type UseBoardReturn = {
  completed: boolean
  winner?: Player
}

export function useBoard(board: Coordinate): UseBoardReturn {
  const { completedBoards } = useContext(STTTContext)

  const result = completedBoards.find(([c]) => crdEq(c, board))

  if (result === undefined) {
    return { completed: false }
  }

  return {
    completed: true,
    winner: result[1],
  }
}

type UseCellReturn = {
  value: Player | undefined
  onClick(this: void, event: Event): void
}

export function useCell(board: Coordinate, cell: Coordinate): UseCellReturn {
  const { moves, active, addMove } = useContext(STTTContext)

  const player = useMemo(
    () => findMove(moves, board, cell)?.player,
    [moves, ...board, ...cell],
  )

  const onClick = useCallback(
    (event: Event) => {
      event.preventDefault()
      addMove({
        player: active,
        board,
        cell,
      })
    },
    [active, ...board, ...cell],
  )

  return useMemo(
    () => ({
      value: player,
      onClick,
    }),
    [player, onClick],
  )
}

function findMove(
  moves: Move[],
  board: Coordinate,
  cell: Coordinate,
): Move | undefined {
  return moves.find(
    (move) => crdEq(move.board, board) && crdEq(move.cell, cell),
  )
}

function isLegalMove(
  moves: Move[],
  move: Move,
  completedBoards: [Coordinate, Player | undefined][],
): boolean {
  // if no moves have been done yet, every move is allowed
  if (moves.length === 0) {
    return true
  }

  // if this move has already been done, it is not allowed
  if (findMove(moves, move.board, move.cell)) {
    return false
  }

  const last = moves[moves.length - 1]

  // if the coordinates of the board matches the coordinates of the cell of the last move, the move is allowed
  if (crdEq(last.cell, move.board)) {
    return true
  }

  // if the board matching the coordinates of the cell of the last move has been completed, every board is allowed
  return completedBoards.find(([c]) => crdEq(c, last.cell)) !== undefined
}

function crdEq(c1: Coordinate, c2: Coordinate): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1]
}

function getBoardCompletion(
  moves: Move[],
  move: Move,
): false | [Coordinate, Player | undefined] {
  const movesOnBoard = moves
    .concat(move)
    .filter((m) => crdEq(m.board, move.board))

  // check for three in a row in the column
  const column = movesOnBoard.filter(
    (m) => m.cell[0] === move.cell[0] && m.player === move.player,
  )
  if (column.length === BOARD_DIM) {
    return [move.board, move.player]
  }

  // check for three in a row in the row
  const row = movesOnBoard.filter(
    (m) => m.cell[1] === move.cell[1] && m.player === move.player,
  )
  if (row.length === BOARD_DIM) {
    return [move.board, move.player]
  }

  // check for three in a row in the diagonal
  if (move.cell[0] === move.cell[1]) {
    const diagonal = movesOnBoard.filter(
      (m) => m.cell[0] === m.cell[1] && m.player === move.player,
    )
    if (diagonal.length === BOARD_DIM) {
      return [move.board, move.player]
    }
  }

  // check for three in a row in the anti-diagonal
  if (move.cell[0] + move.cell[1] + 1 === BOARD_DIM) {
    const antiDiagonal = movesOnBoard.filter(
      (m) =>
        m.cell[0] + m.cell[1] + 1 === BOARD_DIM && m.player === move.player,
    )
    if (antiDiagonal.length === BOARD_DIM) {
      return [move.board, move.player]
    }
  }

  // if the board is full it's a tie
  if (movesOnBoard.length === BOARD_SIZE) {
    return [move.board, undefined]
  }

  return false
}
