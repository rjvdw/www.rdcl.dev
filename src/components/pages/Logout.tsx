import React from 'react'
import { logout } from '../../identity-provider'

export const Logout: React.FunctionComponent = () => {
  logout()
  return null
}
