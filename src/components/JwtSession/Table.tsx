import { VNode } from 'preact'
import { Jwt } from '../../state/auth'

type TableProps = {
  jwt: Jwt
  children(claim: string, value: unknown): VNode
}
export const Table = ({ jwt, children }: TableProps) => (
  <div class="responsive-table-wrapper">
    <table>
      <tbody>
        {Object.entries(jwt.raw).map(([claim, value]) =>
          children(claim, value),
        )}
      </tbody>
    </table>
  </div>
)
