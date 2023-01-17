import { FunctionComponent, useContext, useEffect } from 'react'
import context from './Title.context'

type TitleProps = {
  children?: string
  prefix?: string[] | string
  separator?: string
}

export const Title: FunctionComponent<TitleProps> = ({
  children = '',
  prefix,
  separator = ' | ',
}) => {
  const baseTitle = useContext(context)
  useEffect(() => {
    let parts = [children]
    if (Array.isArray(prefix)) {
      parts = parts.concat(prefix.reverse())
    } else if (prefix !== undefined) {
      parts.push(prefix)
    }
    parts.push(baseTitle)
    document.title = parts.filter(Boolean).join(separator)
  }, [children, prefix, separator, baseTitle])
  return null
}
