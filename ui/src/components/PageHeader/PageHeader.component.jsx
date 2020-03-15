import React, { useEffect, useRef } from 'react'

export const PageHeader = ({ open, ...props }) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current.addEventListener('mobilemenu-open', open)
    return () => ref.current.removeEventListener('mobilemenu-open', open)
  })

  return (
    <rdcl-page-header { ...props } ref={ ref }>rdcl.dev</rdcl-page-header>
  )
}
