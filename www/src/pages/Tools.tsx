import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../components/ActiveRoute'
import { NestedRoutes } from '../components/NestedRoutes'
import { PageTitle } from '../components/PageTitle'
import { SubNavList } from '../components/SubNavList'
import { Countdown } from '../tools/Countdown'
import { DropRates } from '../tools/DropRates'
import { MyIp } from '../tools/MyIp'

const ToolsComponent = NestedRoutes('tools')

const Index: FunctionComponent = () => (
  <>
    <ActiveRoute>index</ActiveRoute>
    <PageTitle />

    <h1>Tools</h1>

    <SubNavList class="tools-list">
      <SubNavList.Item
        href="/password.html"
        label="Generate Password"
        data-native
      >
        Securely generates a password using <code>window.crypto</code>.
      </SubNavList.Item>

      <SubNavList.Item href="/tools/countdown" label="Countdown">
        Solves the numbers game in Countdown.
      </SubNavList.Item>

      <SubNavList.Item href="/tools/drop-rates" label="Drop Rate Calculator">
        Given a drop rate, computes how many attempts you actually need to get
        your item.
      </SubNavList.Item>

      <SubNavList.Item href="/tools/ip" label="My IP">
        Show your current IPv4 and IPv6 addresses.
      </SubNavList.Item>
    </SubNavList>
  </>
)

export const Tools = Object.assign(ToolsComponent, {
  Index,
  Countdown,
  DropRates,
  MyIp,
})
