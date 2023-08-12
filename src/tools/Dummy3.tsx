import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Dummy3: FunctionComponent = () => (
  <>
    <ActiveRoute>dummy3</ActiveRoute>
    <PageTitle>dummy3</PageTitle>

    <h1>Dummy 3</h1>
  </>
)
