import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotify } from '../../components/Notifications'
import { logout, selectJwt, verify } from '../../slices/auth'
import { StoreDispatch, StoreState } from '../../store'

type LoginForm = {
  username: string
  rememberMe: boolean
}

type LoginState = 'initial' | 'pending' | 'success' | 'error'

export const useLogin = () => {
  const [state, setState] = useState<LoginState>('initial')
  const { username } = localStorage
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      username,
      rememberMe: Boolean(username),
    },
  })

  const onSubmit = async (data: LoginForm) => {
    if (data.rememberMe) {
      localStorage.username = data.username
    } else {
      delete localStorage.username
    }
    setState('pending')
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${data.username}&callback=${window.location.origin}/login/verify`,
      }
    )

    if (response.ok) {
      const { sessionToken } = await response.json()
      localStorage.sessionToken = sessionToken
      setState('success')
    } else {
      setState('error')
    }
  }

  return { state, register, handleSubmit: handleSubmit(onSubmit) }
}

type VerificationResultType = 'pending' | 'success' | 'error' | 'invalid'

export const useVerifyLogin = (): VerificationResultType => {
  const notify = useNotify()
  const [verificationResult, setVerificationResult] =
    useState<VerificationResultType>('pending')
  const { sessionToken, redirectAfterLogin = '/' } = localStorage
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const verificationCode = searchParams.get('verification-code')
  const dispatch = useDispatch<StoreDispatch>()
  const authState = useSelector((state: StoreState) => state.auth)
  const jwt = useSelector(selectJwt)

  useEffect(() => {
    if (!sessionToken || !verificationCode) {
      setVerificationResult('invalid')
      return
    }

    dispatch(verify(sessionToken, verificationCode))
  }, [setVerificationResult, sessionToken, verificationCode, dispatch])

  useEffect(() => {
    switch (authState.verificationState) {
      case 'pending':
        setVerificationResult('pending')
        break
      case 'failed':
        setVerificationResult('error')
        break
      case 'done':
        setVerificationResult('success')
        notify(`Login successful, welcome ${jwt?.username}!`)
        navigate(redirectAfterLogin)
        delete localStorage.redirectAfterLogin
        break
    }
  }, [
    authState.verificationState,
    setVerificationResult,
    notify,
    jwt,
    redirectAfterLogin,
    navigate,
  ])

  return verificationResult
}

export const useLogout = () => {
  const navigate = useNavigate()
  const notify = useNotify()
  const dispatch = useDispatch<StoreDispatch>()

  return () => {
    dispatch(logout())
    notify('Logged out successfully')
    navigate('/')
  }
}
