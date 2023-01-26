import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/auth'

export const RequireLogin = () => {
  const loggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loggedIn) {
      localStorage.redirectAfterLogin = location.pathname
      navigate('/login')
    }
  }, [loggedIn, location, navigate])

  return null
}
