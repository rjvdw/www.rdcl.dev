import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const NotFound: FunctionComponent = () => (
  <>
    <ActiveRoute>not-found</ActiveRoute>
    <PageTitle>page not found</PageTitle>

    <h1>Page not found</h1>
  </>
)
