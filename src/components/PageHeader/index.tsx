import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../slices/auth'
import { selectScreenType } from '../../slices/screen'
import { Profile } from './Profile'
import { usePageHeaderRef } from './hooks'
import './styles.sass'

export const PageHeader: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)
  const loggedIn = useSelector(selectIsLoggedIn)
  const ref = usePageHeaderRef()

  return (
    <rdcl-page-header slot="header" screentype={screenType} ref={ref}>
      rdcl.dev
      {loggedIn && <Profile />}
    </rdcl-page-header>
  )
}
