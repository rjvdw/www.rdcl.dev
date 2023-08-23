import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { LoginRequired } from '../components/LoginRequired'
import { PageTitle } from '../components/PageTitle'

export const Health: FunctionComponent = () => (
  <>
    <LoginRequired />
    <ActiveRoute>health</ActiveRoute>
    <PageTitle>health</PageTitle>

    <h1>Health</h1>
  </>
)
