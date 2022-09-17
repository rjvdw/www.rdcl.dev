import React from 'react'
import { useSelector } from 'react-redux'
import { selectScreenType } from '../../slices/screen'
import { usePageHeaderControls } from './usePageHeaderControls'

export const PageHeader: React.FunctionComponent = () => {
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
