import { FunctionComponent } from 'preact'
import { Claim } from './Claim'
import { Entry } from './Entry'
import { Raw } from './Raw'
import { Table } from './Table'
import { Value } from './Value'

const JwtSessionComponent: FunctionComponent = ({ children }) => <>{children}</>

export const JwtSession = Object.assign(JwtSessionComponent, {
  Claim,
  Entry,
  Raw,
  Table,
  Value,
})
