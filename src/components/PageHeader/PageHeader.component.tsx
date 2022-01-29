import React, { useEffect, useRef } from 'react'
import { RdclPageHeader } from '../../elements/rdcl-page-header'

type PageHeaderProps = {
  open: () => void,
  [key: string]: any,
}

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ open, ...props }) => {
  const ref: React.MutableRefObject<RdclPageHeader | null> = useRef(null)

  useEffect(() => {
    ref.current!.addEventListener('mobilemenu-open', open)
    return () => ref.current!.removeEventListener('mobilemenu-open', open)
  })

  return (
    <rdcl-page-header { ...props } ref={ ref }>rdcl.dev</rdcl-page-header>
  )
}
