import { FunctionComponent } from 'preact'
import { useCallback, useId, useMemo, useState } from 'preact/hooks'
import { ActiveRoute } from '../components/ActiveRoute'
import { PageTitle } from '../components/PageTitle'
import { startLogin } from '../state/auth'
import { errorAsString } from '../util/errors'
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
  const [error, setError] = useState<string>()
  const api = useApi(false)

  const onSubmit = useCallback(
    (event: Event) => {
      event.preventDefault()

      if (!isFormSubmitEvent(event)) {
        setError('Unexpected error handling the form submit')
        return
      }

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
      startLogin(user, api).then(
        () => {
          setPending(false)
          setSuccess(true)
        },
        (error) => {
          setPending(false)
          setError(errorAsString(error))
        },
      )
    },
    [setSuccess, setPending, setError],
  )

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

interface FormSubmitEvent extends SubmitEvent {
  target: HTMLFormElement
}

/**
 * Checks whether the received event is actually a SubmitEvent on a HTMLFormElement.
 *
 * This should not be necessary, but due to preact's typings, this check is needed for everything to work.
 */
function isFormSubmitEvent(event: Event): event is FormSubmitEvent {
  return event.type === 'submit' && event.target instanceof HTMLFormElement
}

function isValidUser(user: FormDataEntryValue | null): user is string {
  return Boolean(user) && typeof user === 'string'
}

function rememberMe(form: HTMLFormElement): boolean {
  const rememberMe = form.elements.namedItem('remember-me') as unknown

  return rememberMe instanceof HTMLInputElement && rememberMe.checked
}
