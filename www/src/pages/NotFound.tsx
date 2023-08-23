import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'

export const NotFound: FunctionComponent = () => (
  <>
    <ActiveRoute>not-found</ActiveRoute>
    <PageTitle>not found</PageTitle>

    <h1>Page not found</h1>

    <p>The page you were trying to reach does not exist.</p>
  </>
)
