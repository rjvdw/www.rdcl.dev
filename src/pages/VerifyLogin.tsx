import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'
import { useVerifyLogin } from './Login.hooks'

export const VerifyLogin = () => {
  const result = useVerifyLogin()

  return <>
    <Title>log in</Title>
    <ActiveRoute/>
    <h1>Log in</h1>

    { result === 'pending' ? (
      <p>Logging you in...</p>
    ) : result === 'success' ? (
      <Navigate to="/"/>
    ) : (
      <p className="error-message">Login failed. <Link to="/login">Try again.</Link></p>
    ) }
  </>
}
export default VerifyLogin
