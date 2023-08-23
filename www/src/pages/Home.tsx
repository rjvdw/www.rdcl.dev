import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'

export const Home: FunctionComponent = () => (
  <>
    <ActiveRoute>home</ActiveRoute>
    <PageTitle />

    <h1>rdcl.dev</h1>

    <p>
      Welcome to this page. I use this website to dump random stuff.{' '}
      <a href="https://www.ruud.online">You can find my homepage here</a>.
    </p>
  </>
)
