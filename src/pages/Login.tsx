import { FunctionComponent } from 'preact'
import { useCallback, useId, useMemo, useState } from 'preact/hooks'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'
import { startLogin } from '../state/auth'

export const Login: FunctionComponent = () => {
  const id = useId()
  const { onSubmit, success, pending, error } = useLoginForm()

  return (
    <>
      <ActiveRoute>login</ActiveRoute>
      <PageTitle>login</PageTitle>

      <h1>Login</h1>

      {success ? (
        <p>Login request sent successfully, please wait for an e-mail.</p>
      ) : (
        <form onSubmit={onSubmit} disabled={pending}>
          <label htmlFor={`${id}:user`}>User</label>
          <input
            id={`${id}:user`}
            type="text"
            name="user"
            autoComplete="user"
            required
          />

          <div className="controls">
            <button>Log in</button>
          </div>
        </form>
      )}

      {error !== undefined && <p class="error">Could not log in: {error}</p>}
    </>
  )
}

function useLoginForm() {
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string>()

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

      setPending(true)
      setError(undefined)
      startLogin(user).then(
        () => {
          setPending(false)
          setSuccess(true)
        },
        (error) => {
          setPending(false)
          setError(String(error))
        },
      )
    },
    [setSuccess, setPending, setError],
  )

  return useMemo(
    () => ({
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
