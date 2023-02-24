import React, { FunctionComponent } from 'react'
import { Title } from '../../components/Title'
import { useIp } from './hooks'
import './styles.sass'

export const MyIp = () => (
  <>
    <Title prefix="tools">My IP</Title>
    <h1>My IP</h1>

    <dl className="ip-overview">
      <dt>IPv4</dt>
      <dd>
        <IP v={4} />
      </dd>

      <dt>IPv6</dt>
      <dd>
        <IP v={6} />
      </dd>
    </dl>
  </>
)

const IP: FunctionComponent<{ v: 4 | 6 }> = ({ v }) => {
  const { loading, ip } = useIp(`https://ipv${v}.rdcl.dev/ip`)

  if (loading) {
    return <>checking...</>
  }

  return <>{ip || 'Not supported from this device'}</>
}

export default MyIp
