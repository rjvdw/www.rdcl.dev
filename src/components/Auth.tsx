import React from 'react'
import { SignUp } from './auth/SignUp'

export const Auth: React.FunctionComponent = () => {
  const fragment = window.location.hash

  if (fragment.startsWith("#invite_token=")) {
    const [, token] = fragment.split('=')
    return <SignUp inviteToken={ token }/>
  } else {
    return null
  }
}
