import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { PageTitle } from '../../components/PageTitle'
import { Board } from './Board'
import { Provider, useCreateGameState } from './context'
import './style.scss'

export const SuperTicTacToe: FunctionComponent = () => {
  const context = useCreateGameState()

  const debug = () => {
    console.log(context)
  }

  return (
    <Provider value={context}>
      <ActiveRoute>super-tic-tac-toe</ActiveRoute>
      <PageTitle>super-tic-tac-toe</PageTitle>

      <h1>Super Tic-Tac-Toe</h1>

      <p>
        Rules: Super Tic-Tac-Toe is a two-dimensional game of tic-tac-toe. Each
        cell contains a game of tic-tac-toe. Each move determines in which game
        of tic-tac-toe the next move must take place. For example, if x picks
        the center cell, then o must place their next move in the center game.
        If a game is already finished, players are free to play in any game they
        want. The first player to get three winning games in a line wins.
      </p>

      <Board />

      <p>Active player: {context.active}</p>
      <p>
        <button onClick={() => context.reset()}>Reset</button>{' '}
        <button onClick={debug} hidden>
          Debug
        </button>
      </p>
      {context.error && <p class="error">{context.error}</p>}
    </Provider>
  )
}
