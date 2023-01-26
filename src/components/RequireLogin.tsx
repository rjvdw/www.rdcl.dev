import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/auth'

export const RequireLogin = () => {
  const loggedIn = useSelector(selectIsLoggedIn)

  if (!loggedIn) {
    return (
      <>
        <Navigate to="/login" />
      </>
    )
  }

  return null
}
