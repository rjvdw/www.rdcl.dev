import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { LoginRequired } from '../components/LoginRequired.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Activities: FunctionComponent = () => (
  <>
    <LoginRequired />
    <ActiveRoute>activities</ActiveRoute>
    <PageTitle>activities</PageTitle>

    <h1>Activities</h1>
  </>
)
