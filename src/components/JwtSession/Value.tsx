import { formatISO } from 'date-fns'

type ValueProps = {
  claim: string
  children: unknown
}
export const Value = ({ claim, children: value }: ValueProps) => {
  if (claim === 'iat' || claim === 'exp') {
    if (typeof value === 'number') {
      const date = new Date(1000 * value)
      return (
        <time dateTime={formatISO(date)}>
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'long',
            hour12: false,
          }).format(date)}
        </time>
      )
    }
  }

  if (Array.isArray(value)) {
    if (claim === 'groups') {
      return <>{value.join(', ')}</>
    }
    return <code>{JSON.stringify(value)}</code>
  }

  return <>{value}</>
}
