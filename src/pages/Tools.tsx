import { FunctionComponent } from 'preact'
import { Router } from 'preact-router'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'
import { Routing } from '../components/Routing'
import { Countdown } from '../tools/Countdown'
import { DropRates } from '../tools/DropRates'

const ToolsComponent: FunctionComponent = ({ children }) => (
  <>
    <ActiveRoute>tools</ActiveRoute>

    <Routing>
      <PageTitle.Provider title="tools">
        <Router>{children}</Router>
      </PageTitle.Provider>
    </Routing>
  </>
)

const Index: FunctionComponent = () => (
  <>
    <ActiveRoute>index</ActiveRoute>
    <PageTitle />

    <h1>Tools</h1>

    <List>
      <Item href="/password.html" label="Generate Password" data-native>
        Securely generates a password using <code>window.crypto</code>.
      </Item>

      <Item href="/tools/countdown" label="Countdown">
        Solves the numbers game in Countdown.
      </Item>

      <Item href="/tools/drop-rates" label="Drop Rate Calculator">
        Given a drop rate, computes how many attempts you actually need to get
        your item.
      </Item>
    </List>
  </>
)

const List: FunctionComponent = ({ children }) => (
  <dl class="tools-list">{children}</dl>
)

const Item: FunctionComponent<{ href: string; label: string }> = ({
  children,
  href,
  label,
  ...rest
}) => (
  <>
    <dt>
      <a href={href} {...rest}>
        {label}
      </a>
    </dt>
    <dd>{children}</dd>
  </>
)

export const Tools = Object.assign(ToolsComponent, {
  Index,
  Countdown,
  DropRates,
})
