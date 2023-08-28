import { FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { completeLogin } from '../../state/auth'
import { errorAsString } from '../../util/errors'
import { useApi } from '../../util/http'

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
  const api = useApi(false)

  useEffect(() => {
    const params = new URL(document.location.href).searchParams
    const verificationCode = params.get('verification-code')

    if (!verificationCode) {
      setError('Missing verification code')
      return
    }

    completeLogin(verificationCode, api).catch((err) => {
      setError(errorAsString(err))
    })
  }, [setError])

  return {
    error,
  }
}
