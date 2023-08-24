import { FunctionComponent } from 'preact'
import { useId, useMemo, useState } from 'preact/hooks'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'
import { startLogin } from '../state/auth'
import { useFormHandler } from '../util/form'
import { useApi } from '../util/http'

export const Login: FunctionComponent = () => {
  const id = useId()
  const { username, rememberMe, onSubmit, success, pending, error } =
    useLoginForm()

  return (
    <>
      <ActiveRoute>login</ActiveRoute>
      <PageTitle>login</PageTitle>

      <h1>Login</h1>

      {success ? (
        <p>Login request sent successfully, please wait for an e-mail.</p>
      ) : (
        <form onSubmit={onSubmit} disabled={pending}>
          <section class="form-grid">
            <label htmlFor={`${id}:user`}>User</label>
            <input
              id={`${id}:user`}
              type="text"
              name="user"
              autoComplete="user"
              required
              defaultValue={username}
            />

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
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)
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
    setError(undefined)
    try {
      await startLogin(user, api)
      setSuccess(true)
    } finally {
      setPending(false)
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
      success,
      pending,
      error,
    }),
    [onSubmit, success, pending, error],
  )
}

function isValidUser(user: FormDataEntryValue | null): user is string {
  return Boolean(user) && typeof user === 'string'
}

function rememberMe(form: HTMLFormElement): boolean {
  const rememberMe = form.elements.namedItem('remember-me') as unknown

  return rememberMe instanceof HTMLInputElement && rememberMe.checked
}
