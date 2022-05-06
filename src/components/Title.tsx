import React, { useEffect } from 'react'

const INITIAL_TITLE = document.title

type TitleProps = {
  title?: string,
  path?: string[],
}

export const Title: React.FunctionComponent<TitleProps> = ({ title = '', path = [] }) => {
  const parts = title ? [title, ...path, INITIAL_TITLE] : [...path, INITIAL_TITLE]
  useEffect(() => {
    document.title = parts.join(' | ')
  })
  return null
}
