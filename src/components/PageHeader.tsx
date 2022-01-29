import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RdclPageHeader } from '../elements/rdcl-page-header'
import { open as openSideMenu } from '../modules/sidemenu'
import { selectScreenType } from '../modules/screen'

export const PageHeader: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const open = () => dispatch(openSideMenu())

  const ref: React.MutableRefObject<RdclPageHeader | null> = useRef(null)

  const screenType = useSelector(selectScreenType)

  useEffect(() => {
    ref.current!.addEventListener('mobilemenu-open', open)
    return () => ref.current!.removeEventListener('mobilemenu-open', open)
  })

  return (
    <rdcl-page-header
      slot="header"
      screentype={ screenType }
      ref={ ref }
    >rdcl.dev</rdcl-page-header>
  )
}
