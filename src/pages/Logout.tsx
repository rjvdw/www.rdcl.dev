import React from 'react'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'
import { useLogout } from './authenticationHooks'

export const Logout = () => {
  const logout = useLogout()

  return <>
    <Title>log out</Title>
    <ActiveRoute/>
    <h1>Log out</h1>

    <button onClick={ () => logout() }>Click here to log out</button>
  </>
}
export default Logout
