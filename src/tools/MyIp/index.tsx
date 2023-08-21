import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { PageTitle } from '../../components/PageTitle'
import { useIp } from './hooks'

export const MyIp: FunctionComponent = () => {
  return (
    <>
      <ActiveRoute>my-ip</ActiveRoute>
      <PageTitle>my ip</PageTitle>

      <h1>My IP</h1>

      <dl>
        <IP v={4} />
        <IP v={6} />
      </dl>
    </>
  )
}

const IP: FunctionComponent<{ v: 4 | 6 }> = ({ v }) => {
  const { loading, ip } = useIp(`https://ipv${v}.rdcl.dev/ip`)

  return (
    <>
      <dt>IPv{v}</dt>
      <dd>
        {loading ? 'checking...' : ip || 'Not supported from this device'}
      </dd>
    </>
  )
}
