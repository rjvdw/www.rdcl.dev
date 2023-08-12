import { FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { completeLogin } from '../state/auth'

export const LoginVerify: FunctionComponent = () => {
  const { error } = useVerification()

  return (
    <>
      <h1>Login</h1>

      {error === undefined ? (
        <p>Just a moment, you are being logged in</p>
      ) : (
        <p class="error">Verification failed: {error}</p>
      )}
    </>
  )
}

function useVerification() {
  const [error, setError] = useState<string>()

  useEffect(() => {
    const params = new URL(document.location.href).searchParams
    const verificationCode = params.get('verification-code')

    if (!verificationCode) {
      setError('Missing verification code')
      return
    }

    completeLogin(verificationCode).then(
      () => {
        route(
          typeof localStorage.redirectAfterLogin === 'string'
            ? localStorage.redirectAfterLogin
            : '/',
          true,
        )
        delete localStorage.redirectAfterLogin
      },
      (err) => {
        setError(String(err))
      },
    )
  }, [setError])

  return {
    error,
  }
}
