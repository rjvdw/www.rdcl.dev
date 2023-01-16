import { formatISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'
import { selectJwt } from '../slices/auth'
import { Jwt } from '../util/Jwt'

const JWT_CLAIMS: Record<string, string> = {
  iss: 'Issuer',
  sub: 'Subject',
  aud: 'Audience',
  exp: 'Expiry',
  nbf: 'Not Before',
  iat: 'Issued At',
  jti: 'JWT ID',
  azp: 'Authorized Party',
  upn: 'User Principal Name',
}

export const Session = () => {
  const jwt = useSelector(selectJwt)

  return <>
    <Title>session</Title>
    <ActiveRoute>session</ActiveRoute>
    <h1>Session</h1>
    { jwt ? (
      <RenderJwt jwt={ jwt }/>
    ) : (
      <p>No session</p>
    ) }
  </>
}

const RenderJwt: FunctionComponent<{ jwt: Jwt }> = ({ jwt }) => {
  return <>
    <table>
      <tbody>
        { Object.entries(jwt.raw).map(([claim, value]) => (
          <tr key={ claim }>
            <JwtClaim>{ claim }</JwtClaim>
            <JwtValue claim={ claim }>{ value }</JwtValue>
          </tr>
        )) }
      </tbody>
    </table>

    <h2>Raw</h2>
    <pre>{ JSON.stringify(jwt.raw, null, 2) }</pre>
  </>
}

const JwtClaim: FunctionComponent<{ children: string }> = ({ children: claim }) => (
  <th>{ JWT_CLAIMS[claim] ? <abbr title={ JWT_CLAIMS[claim] }>{ claim }</abbr> : claim }</th>
)

const JwtValue: FunctionComponent<{ claim: string, children: unknown }> = ({ claim, children: value }) => {
  if (claim === 'iat' || claim === 'exp') {
    if (typeof value === 'number') {
      const date = new Date(1000 * value)
      return <td>
        <time dateTime={ formatISO(date) }>
          { Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'long',
            hour12: false,
          }).format(date) }
        </time>
      </td>
    }
  }

  if (claim === 'groups') {
    if (Array.isArray(value)) {
      return <td>{ value.join(', ') }</td>
    }
  }

  if (typeof value === 'string' || value === null || value === undefined) {
    return <td>{ value }</td>
  }

  if (Array.isArray(value)) {
    return <td><code>{ JSON.stringify(value) }</code></td>
  }

  return <td>{ `${ value }` }</td>
}
