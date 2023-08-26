import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { NestedRoutes } from '../components/NestedRoutes'
import { PageTitle } from '../components/PageTitle'
import { SubNavList } from '../components/SubNavList'
import { SuperTicTacToe } from '../games/SuperTicTacToe'

const GamesComponent = NestedRoutes('games')

const Index: FunctionComponent = () => (
  <>
    <ActiveRoute>index</ActiveRoute>
    <PageTitle />

    <h1>Games</h1>

    <SubNavList class="games-list">
      <SubNavList.Item
        href="/games/super-tic-tac-toe"
        label="Super Tic-Tac-Toe"
      >
        A three-dimensional game of tic-tac-toe.
      </SubNavList.Item>
    </SubNavList>
  </>
)

export const Games = Object.assign(GamesComponent, {
  Index,
  SuperTicTacToe,
})
