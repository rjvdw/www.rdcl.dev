import React from 'react'
import { login } from '../../identity-provider'

export const Login: React.FunctionComponent = () => {
  login()
  return null
}
