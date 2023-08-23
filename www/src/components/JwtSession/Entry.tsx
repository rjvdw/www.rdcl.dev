import { VNode } from 'preact'

type EntryProps = {
  children: [VNode, VNode]
}
export const Entry = ({ children }: EntryProps) => (
  <tr>
    <th>{children[0]}</th>
    <td>{children[1]}</td>
  </tr>
)
