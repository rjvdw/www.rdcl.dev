import React, { useState } from 'react'
import { useAutoFocusRef } from '../../util'

export const Login = ({ loggedIn, login, logout, error, loading }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const usernameRef = useAutoFocusRef()

  if (loggedIn && (password || otp)) {
    setPassword('')
    setOtp('')
  }

  const onSubmit = async event => {
    event.preventDefault()
    login(username, password, otp)
  }

  return <>
    <h1>Log in</h1>

    { error ? <>
      <h2>Fout!</h2>
      <p>{ error }</p>
    </> : '' }

    <form onSubmit={ onSubmit }>
      <rdcl-input-grid>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          ref={ usernameRef }
          type="text"
          inputMode="email"
          autoFocus
          required
          disabled={ loggedIn || loading }
          value={ username }
          onChange={ event => setUsername(event.target.value) }
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          disabled={ loggedIn || loading }
          value={ password }
          onChange={ event => setPassword(event.target.value) }
        />

        <label htmlFor="otp">OTP</label>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          disabled={ loggedIn || loading }
          value={ otp }
          onChange={ event => setOtp(event.target.value) }
        />

        { loggedIn ? <>
          <button data-start={ 2 } type="button" onClick={ () => logout() }>Log out</button>
        </> : <>
          <button data-start={ 2 } disabled={ loading }>Submit</button>
        </> }
      </rdcl-input-grid>
    </form>
  </>
}
