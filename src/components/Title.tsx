import React, { useEffect } from 'react'

const INITIAL_TITLE = document.title

type TitleProps = {
  children?: string | string[],
}

export const Title: React.FunctionComponent<TitleProps> = ({ children = '' }) => {
  const parts = Array.isArray(children) ? [...children, INITIAL_TITLE] : [children, INITIAL_TITLE]
  useEffect(() => {
    document.title = parts.filter(Boolean).join(' | ')
  })
  return null
}
