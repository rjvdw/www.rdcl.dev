import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { LoginRequired } from '../components/LoginRequired.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Labels: FunctionComponent = () => (
  <>
    <LoginRequired />
    <ActiveRoute>labels</ActiveRoute>
    <PageTitle>labels</PageTitle>

    <h1>Labels</h1>
  </>
)
