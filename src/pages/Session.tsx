import { formatISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'
import { selectJwt } from '../slices/auth'
import { Jwt } from '../util/Jwt'

const JWT_KEYS: Record<string, string> = {
  iss: 'Issuer',
  sub: 'Subject',
  upn: 'User Principal Name',
  iat: 'Issued at',
  exp: 'Expiry',
  jti: 'JWT ID',
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
        { Object.entries(jwt.raw).map(([key, value]) => (
          <tr key={ key }>
            <JwtKey>{ key }</JwtKey>
            <JwtValue jwtKey={ key }>{ value }</JwtValue>
          </tr>
        )) }
      </tbody>
    </table>

    <h2>Raw</h2>
    <pre>{ JSON.stringify(jwt.raw, null, 2) }</pre>
  </>
}

const JwtKey: FunctionComponent<{ children: string }> = ({ children }) => (
  <th>{ JWT_KEYS[children] ? <abbr title={ JWT_KEYS[children] }>{ children }</abbr> : children }</th>
)

const JwtValue: FunctionComponent<{ jwtKey: string, children: unknown }> = ({ jwtKey, children }) => {
  if (jwtKey === 'iat' || jwtKey === 'exp') {
    if (typeof children === 'number') {
      const date = new Date(1000 * children)
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

  if (jwtKey === 'groups') {
    if (Array.isArray(children)) {
      return <td>{ children.join(', ') }</td>
    }
  }

  if (typeof children === 'string' || children === null || children === undefined) {
    return <td>{ children }</td>
  }

  if (Array.isArray(children)) {
    return <td><code>{ JSON.stringify(children) }</code></td>
  }

  return <td>{ `${ children }` }</td>
}
