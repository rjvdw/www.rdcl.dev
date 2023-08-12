import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Dummy2: FunctionComponent = () => (
  <>
    <ActiveRoute>dummy2</ActiveRoute>
    <PageTitle>dummy2</PageTitle>

    <h1>Dummy 2</h1>
  </>
)
