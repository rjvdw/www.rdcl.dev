import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'

export const NotFound: FunctionComponent = () => (
  <>
    <ActiveRoute>not-found</ActiveRoute>
    <PageTitle>page not found</PageTitle>

    <h1>Page not found</h1>
  </>
)
