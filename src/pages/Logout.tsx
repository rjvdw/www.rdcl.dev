import { FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'
import { logout } from '../state/auth'

export const Logout: FunctionComponent = () => {
  const { success, onClick } = useLogoutState()

  return (
    <>
      <ActiveRoute>logout</ActiveRoute>
      <PageTitle>logout</PageTitle>

      <h1>Logout</h1>

      <button onClick={onClick}>Logout</button>

      {success === false && (
        <p class="error">
          There was an error trying to log you out, please try again.
        </p>
      )}
    </>
  )
}

function useLogoutState() {
  const [success, setSuccess] = useState<boolean>()

  useEffect(() => {
    if (success) {
      route('/')
    }
  }, [success])

  return {
    success,
    onClick: () => {
      logout().then(
        () => setSuccess(true),
        () => setSuccess(false),
      )
    },
  }
}
