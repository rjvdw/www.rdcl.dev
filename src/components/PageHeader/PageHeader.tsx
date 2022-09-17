import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectScreenType } from '../../slices/screen'
import { usePageHeaderControls } from './usePageHeaderControls'

export const PageHeader: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)
  const { ref } = usePageHeaderControls()

  return (
    <rdcl-page-header
      slot="header"
      screentype={ screenType }
      ref={ ref }
    >rdcl.dev</rdcl-page-header>
  )
}
