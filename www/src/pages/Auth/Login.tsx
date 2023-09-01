import { FunctionComponent } from 'preact'
import { useMemo, useState } from 'preact/hooks'
import { ActiveRoute } from '../../components/ActiveRoute'
import { PageTitle } from '../../components/PageTitle'
import { handleLogin, startLogin } from '../../state/auth'
import { LoginResponseBody } from '../../state/auth/types'
import { useFormHandler } from '../../util/form'
import { useApi } from '../../util/http'

export const Login: FunctionComponent = () => {
  const {
    username,
    rememberMe,
    onSubmit,
    mode,
    success,
    pending,
    error,
    loginPending,
  } = useLoginForm()

  return (
    <>
      <ActiveRoute>login</ActiveRoute>
      <PageTitle>login</PageTitle>

      <h1>Login</h1>

      {loginPending ? (
        <p>Login pending...</p>
      ) : success && mode === 'EMAIL' ? (
        <p>Login request sent successfully, please wait for an e-mail.</p>
      ) : success && mode === 'AUTHENTICATOR' ? (
        <p>Logged in successfully.</p>
      ) : (
        <form onSubmit={onSubmit} disabled={pending} data-testid="login:form">
          <section class="form-grid">
            <label for="login:user">User</label>
            <input
              id="login:user"
              data-testid="login:user"
              type="text"
              name="user"
              autoComplete="user"
              required
              defaultValue={username}
            />

            {success === false && (
              <label data-start="2">
                <input type="checkbox" name="mode-email" /> Use e-mail
                authentication
              </label>
            )}

            <button data-start="2">Log in</button>

            <label data-start="2">
              <input
                type="checkbox"
                name="remember-me"
                defaultChecked={rememberMe}
              />{' '}
              Remember me
            </label>

            {error !== undefined && (
              <p data-start="2" class="error">
                Could not log in: {error}
              </p>
            )}
          </section>
        </form>
      )}
    </>
  )
}

function useLoginForm() {
  const [mode, setMode] = useState<LoginResponseBody['mode']>()
  const [success, setSuccess] = useState<boolean | null>(null)
  const [pending, setPending] = useState(false)
  const [loginPending, setLoginPending] = useState(false)
  const api = useApi(false)

  const { error, onSubmit } = useFormHandler(async (event, { setError }) => {
    const user = new FormData(event.target).get('user')

    if (!isValidUser(user)) {
      setError('Invalid user')
      return
    }

    if (rememberMe(event.target)) {
      localStorage.username = user
    } else {
      delete localStorage.username
    }

    setPending(true)
    setSuccess(null)
    setError(undefined)
    try {
      const { response, body } = await startLogin(
        api,
        user,
        enforeModeEmail(event.target),
      )
      setLoginPending(true)
      const success = await handleLogin(api, body, response)
      setLoginPending(false)

      setMode(body.mode)
      setSuccess(success)
      if (!success) {
        setError('Login attempt failed')
      }
    } finally {
      setPending(false)
      setLoginPending(false)
    }
  }, [])

  return useMemo(
    () => ({
      username:
        typeof localStorage.username === 'string'
          ? localStorage.username
          : undefined,
      rememberMe: Boolean(localStorage.username),
      onSubmit,
      mode,
      success,
      pending,
      error,
      loginPending,
    }),
    [onSubmit, success, pending, error, loginPending],
  )
}

function isValidUser(user: FormDataEntryValue | null): user is string {
  return Boolean(user) && typeof user === 'string'
}

function rememberMe(form: HTMLFormElement): boolean {
  const rememberMe = form.elements.namedItem('remember-me') as unknown

  return rememberMe instanceof HTMLInputElement && rememberMe.checked
}

function enforeModeEmail(form: HTMLFormElement): 'EMAIL' | undefined {
  const mode = form.elements.namedItem('mode-email') as unknown

  return mode instanceof HTMLInputElement && mode.checked ? 'EMAIL' : undefined
}
