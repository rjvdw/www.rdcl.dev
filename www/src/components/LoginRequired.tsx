import { FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import { auth } from '../state/auth'

export const LoginRequired: FunctionComponent = () => {
  useEffect(() => {
    if (!auth.value.loggedIn) {
      localStorage.redirectAfterLogin = currentLocation()
      route('/login')
    }
  }, [auth.value.loggedIn])

  return null
}

function currentLocation(): string {
  return document.location.href.substring(document.location.origin.length)
}
