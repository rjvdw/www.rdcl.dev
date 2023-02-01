import React, { useCallback } from 'react'
import { ActiveRoute } from '../../components/ActiveRoute'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'
import { useApi } from '../../util/http'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import './styles.sass'

type Profile = {
  name: string
  email: string
}

export const Me = () => {
  const { profile, loading, error } = useProfile()

  return (
    <>
      <RequireLogin />
      <Title>profile</Title>
      <ActiveRoute>profile</ActiveRoute>
      <h1>Profile</h1>

      {loading && <p>Loading profile...</p>}

      {error && (
        <p className="error-message">Could not load profile: {error}</p>
      )}

      {profile && (
        <dl className="user-profile">
          <dt>Name</dt>
          <dd>{profile.name}</dd>

          <dt>E-mail</dt>
          <dd>{profile.email}</dd>
        </dl>
      )}
    </>
  )
}

function useProfile() {
  const api = useApi()
  const action = useCallback(async (): Promise<Profile> => {
    const response = await api.get('/auth/me')
    return response.json()
  }, [api])
  const { data: profile, loading, error } = useAsyncLoad(action)

  return { profile, loading, error }
}
