import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { LoginRequired } from '../components/LoginRequired.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Health: FunctionComponent = () => (
  <>
    <LoginRequired />
    <ActiveRoute>health</ActiveRoute>
    <PageTitle>health</PageTitle>

    <h1>Health</h1>
  </>
)
