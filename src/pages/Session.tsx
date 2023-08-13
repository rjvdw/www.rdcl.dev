import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { JwtSession } from '../components/JwtSession'
import { PageTitle } from '../components/PageTitle'
import { auth } from '../state/auth'

export const Session: FunctionComponent = () => (
  <>
    <PageTitle>session</PageTitle>
    <ActiveRoute>session</ActiveRoute>

    <h1>Session information</h1>

    {auth.value.loggedIn ? (
      <JwtSession>
        <JwtSession.Table jwt={auth.value.jwt}>
          {(claim, value) => (
            <JwtSession.Entry key={claim}>
              <JwtSession.Claim>{claim}</JwtSession.Claim>
              <JwtSession.Value claim={claim}>{value}</JwtSession.Value>
            </JwtSession.Entry>
          )}
        </JwtSession.Table>

        <h2>Raw</h2>
        <JwtSession.Raw>{auth.value.jwt}</JwtSession.Raw>
      </JwtSession>
    ) : (
      <p>No active session</p>
    )}
  </>
)
