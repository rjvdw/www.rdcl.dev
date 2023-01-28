import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectScreenType } from '../../slices/screen'
import { Icon } from '../Icon'

export const Profile = () => {
  const screenType = useSelector(selectScreenType)

  return (
    <Link to="/me" className={`header-profile--${screenType}`}>
      <Icon.Profile className="header-profile__icon" />
    </Link>
  )
}
