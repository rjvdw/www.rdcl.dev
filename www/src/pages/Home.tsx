import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'

export const Home: FunctionComponent = () => (
  <>
    <ActiveRoute>home</ActiveRoute>
    <PageTitle />

    <h1>Hello, World!</h1>
  </>
)
