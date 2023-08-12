import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'

export const Home: FunctionComponent = () => (
  <>
    <ActiveRoute>home</ActiveRoute>
    <PageTitle />

    <h1>Hello, World!</h1>
  </>
)
