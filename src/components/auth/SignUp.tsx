import React, { ChangeEvent, FormEvent, useState } from 'react'
import classNames from 'classnames'
import { auth } from '../../auth'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../../modules/auth'

type SignUpProps = {
  inviteToken: string,
}

type AuthData = {
  password: string,
  passwordConfirm: string,
}

export const SignUp: React.FunctionComponent<SignUpProps> = ({ inviteToken }) => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(true)
  const [authData, setAuthData] = useState<AuthData>({
    password: '',
    passwordConfirm: '',
  })

  const closeModal = () => {
    setIsOpen(false)
    window.location.hash = ''
  }

  const update = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [field]: event.target.value,
    })
  }

  const isValid = () =>
    authData.password &&
    authData.password === authData.passwordConfirm

  const completeRegistration = async (event: FormEvent) => {
    event.preventDefault()

    if (!isValid()) {
      return
    }

    try {
      const result = await auth.acceptInvite(inviteToken, authData.password)
      dispatch(setAuthenticated({
        id: result.id,
        email: result.email,
        token: result.token,
        metadata: result.user_metadata,
      }))
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  return <>
    <div
      className={ classNames('auth-dialog-backdrop', {
        'auth-dialog-backdrop--open': isOpen,
      }) }
      onClick={ () => setIsOpen(false) }
    />

    <div className={ classNames('auth-dialog', {
      'auth-dialog--open': isOpen,
    }) }>
      <h1>Sign up</h1>

      <p>Please set up a password for your account.</p>

      <form onSubmit={ completeRegistration }>
        <rdcl-input-grid>
          <label htmlFor="sign-up_password">Password</label>
          <input
            id="sign-up_password"
            type="password"
            value={ authData.password }
            onChange={ update('password') }
          />

          <label htmlFor="sign-up_password-confirm">Confirm password</label>
          <input
            id="sign-up_password-confirm"
            type="password"
            value={ authData.passwordConfirm }
            onChange={ update('passwordConfirm') }
          />
        </rdcl-input-grid>

        <div className="auth-dialog_controls">
          <button
            type="submit"
            disabled={ !isValid() }
          >
            Finish registration
          </button>

          <button onClick={ () => closeModal() }>
            Cancel registration
          </button>
        </div>
      </form>
    </div>
  </>
}
