import { FunctionComponent, useEffect } from 'react'

const INITIAL_TITLE = document.title

type TitleProps = {
  children?: string,
  prefix?: string[],
  separator?: string,
}

export const Title: FunctionComponent<TitleProps> = (
  {
    children = '',
    prefix = [],
    separator = ' | ',
  },
) => {
  const parts = [children, ...prefix, INITIAL_TITLE]
  useEffect(() => {
    document.title = parts.filter(Boolean).join(separator)
  })
  return null
}
