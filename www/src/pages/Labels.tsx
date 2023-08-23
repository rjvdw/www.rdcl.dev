import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { LoginRequired } from '../components/LoginRequired'
import { PageTitle } from '../components/PageTitle'

export const Labels: FunctionComponent = () => (
  <>
    <LoginRequired />
    <ActiveRoute>labels</ActiveRoute>
    <PageTitle>labels</PageTitle>

    <h1>Labels</h1>
  </>
)
