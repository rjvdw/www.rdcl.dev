import { FunctionComponent } from 'preact'
import { Claim } from './Claim.tsx'
import { Entry } from './Entry.tsx'
import { Raw } from './Raw.tsx'
import { Table } from './Table.tsx'
import { Value } from './Value.tsx'

const JwtSessionComponent: FunctionComponent = ({ children }) => <>{children}</>

export const JwtSession = Object.assign(JwtSessionComponent, {
  Claim,
  Entry,
  Raw,
  Table,
  Value,
})
