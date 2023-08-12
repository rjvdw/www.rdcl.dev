import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Dummy1: FunctionComponent = () => (
  <>
    <ActiveRoute>dummy1</ActiveRoute>
    <PageTitle>dummy1</PageTitle>

    <h1>Dummy 1</h1>
  </>
)
