import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RdclPageHeader } from '../elements/rdcl-page-header'
import { selectScreenType } from '../slices/screen'
import { open as openSideMenu } from '../slices/side-menu'
import { StoreDispatch } from '../store'

export const PageHeader: React.FunctionComponent = () => {
  const dispatch = useDispatch<StoreDispatch>()
  const open = () => dispatch(openSideMenu())

  const ref: React.MutableRefObject<RdclPageHeader | null> = useRef(null)

  const screenType = useSelector(selectScreenType)

  useEffect(() => {
    const { current } = ref
    current?.addEventListener('mobile-menu-open', open)
    return () => current?.removeEventListener('mobile-menu-open', open)
  })

  return (
    <rdcl-page-header
      slot="header"
      screentype={ screenType }
      ref={ ref }
    >rdcl.dev</rdcl-page-header>
  )
}
