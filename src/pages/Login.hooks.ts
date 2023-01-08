import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNotify } from '../components/Notifications'
import { selectJwt, verify } from '../slices/auth'
import { StoreDispatch, StoreState } from '../store'

type LoginForm = {
  username: string
}

type LoginState = 'initial' | 'pending' | 'success' | 'error'

export const useLogin = () => {
  const [state, setState] = useState<LoginState>('initial')
  const { register, handleSubmit } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setState('pending')
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

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
  const [verificationResult, setVerificationResult] = useState<VerificationResultType>('pending')
  const { sessionToken } = localStorage
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
        notify(`Login successful, welcome ${ jwt?.username }!`)
        break
    }
  }, [authState.verificationState, setVerificationResult, notify, jwt])

  return verificationResult
}
