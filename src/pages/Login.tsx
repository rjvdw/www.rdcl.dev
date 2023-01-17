import React, { useId } from 'react'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'
import { useLogin } from './authenticationHooks'

export const Login = () => {
  const id = useId()
  const { state, register, handleSubmit } = useLogin()

  return (
    <>
      <Title>log in</Title>
      <ActiveRoute />
      <h1>Log in</h1>

      {state === 'success' ? (
        <p>Login request sent successfully, please wait for an e-mail.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <rdcl-input-grid>
            <label htmlFor={id}>User</label>
            <input
              id={id}
              type="text"
              disabled={state === 'pending'}
              {...register('username')}
            />

            <button data-start={2} disabled={state === 'pending'}>
              Log in
            </button>

            {state === 'error' && (
              <p className="error-message" data-start={2}>
                Unable to send the login request.
              </p>
            )}
          </rdcl-input-grid>
        </form>
      )}
    </>
  )
}
export default Login
