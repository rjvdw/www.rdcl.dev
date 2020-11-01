import React from 'react'
import classNames from 'classnames'
import './ConnectFour.styles.sass'

export const ConnectFour = ({ board, activePlayer, nrRows, nrCols, invalidMove, gameOver, winner, move, reset }) => <>
  <h1>Connect Four</h1>

  <div>
    <div
      className={ classNames(
        'connect-four-board',
        {
          'connect-four-board--player-0': activePlayer === 0,
          'connect-four-board--player-1': activePlayer === 1,
        }
      ) }
      data-rows={ nrRows }
      data-cols={ nrCols }
    >
      { board.rows.map((row, rowIdx) =>
        row.cells.map((cell, colIdx) =>
          <div
            key={ `cell-${ rowIdx }-${ colIdx }` }
            onClick={ () => move(colIdx) }
            className={ classNames('connect-four-cell', {
              'connect-four-cell--player-0': cell.value === 0,
              'connect-four-cell--player-1': cell.value === 1,
            }) }
          />
        )
      ) }
    </div>
  </div>

  { gameOver && <p>{ winner === null ? "It's a tie!" : `Player ${ 1 + winner } has won!` }</p> }
  { invalidMove && <p>Invalid move!</p> }

  <button onClick={ () => reset() }>Reset</button>
</>
