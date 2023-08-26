import { useBoard, useCell } from './context'
import { Coordinate } from './types'

export const Board = () => (
  <div class="super-tic-tac-toe">
    {map((c) => (
      <SubBoard key={c.toString()} coordinate={c} />
    ))}
  </div>
)

type SubBoardProps = { coordinate: Coordinate }

const SubBoard = ({ coordinate: board }: SubBoardProps) => {
  const meta = useBoard(board)

  return (
    <div
      class="sub-board"
      data-completed={meta.completed}
      data-winner={meta.winner}
    >
      <div class="inner">
        {map((c) => (
          <Cell key={c.toString()} board={board} coordinate={c} />
        ))}
      </div>
      {meta.completed && meta.winner ? (
        <div class="overlay">{meta.winner}</div>
      ) : null}
    </div>
  )
}

type CellProps = { board: Coordinate; coordinate: Coordinate }

const Cell = ({ board, coordinate: cell }: CellProps) => {
  const { value, onClick } = useCell(board, cell)

  return (
    <button class="cell" onClick={onClick}>
      {value}
    </button>
  )
}

function map<T>(mapper: (c: Coordinate) => T) {
  return Array.from(coordinates()).map(mapper)
}

function* coordinates(): Generator<Coordinate, void, never> {
  yield [0, 0]
  yield [0, 1]
  yield [0, 2]

  yield [1, 0]
  yield [1, 1]
  yield [1, 2]

  yield [2, 0]
  yield [2, 1]
  yield [2, 2]
}
