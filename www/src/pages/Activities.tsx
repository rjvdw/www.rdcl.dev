import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { LoginRequired } from '../components/LoginRequired'
import { PageTitle } from '../components/PageTitle'

export const Activities: FunctionComponent = () => (
  <>
    <LoginRequired />
    <ActiveRoute>activities</ActiveRoute>
    <PageTitle>activities</PageTitle>

    <h1>Activities</h1>
  </>
)
