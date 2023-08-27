import { useState } from 'preact/hooks'
import { useFormHandler } from '../../util/form'
import { asParams, getBody, useApi } from '../../util/http'
import { isUserProfile, UserProfile } from './types'

export function useEditProfile(setData: (data: UserProfile) => void) {
  const [pending, setPending] = useState(false)
  const api = useApi(true)

  const { error, onSubmit } = useFormHandler(async (event, { setError }) => {
    const body = asParams(event.target)

    setPending(true)
    setError(undefined)
    try {
      const response = await api.patch('/auth/me', body)
      const profile = await getBody(response, isUserProfile)
      setData(profile)
    } finally {
      setPending(false)
    }
  }, [])

  return {
    pending,
    error,
    onSubmit,
  }
}
