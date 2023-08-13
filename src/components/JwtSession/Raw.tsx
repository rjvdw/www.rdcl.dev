import { Jwt } from '../../state/auth'

type RawProps = {
  children: Jwt
}
export const Raw = ({ children: jwt }: RawProps) => (
  <pre>{JSON.stringify(jwt.raw, null, 2)}</pre>
)
