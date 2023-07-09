import React, { useCallback } from 'react'
import { ActiveRoute } from '../../components/ActiveRoute'
import { Error } from '../../components/Error'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'
import { useApi } from '../../util/http'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import './styles.sass'

type UserProfile = {
  name: string
  email: string
}

export const Profile = () => {
  const { profile, loading, errors } = useProfile()

  return (
    <>
      <RequireLogin />
      <Title>profile</Title>
      <ActiveRoute>profile</ActiveRoute>
      <h1>Profile</h1>

      {loading && <p>Loading profile...</p>}

      {errors.length > 0 && (
        <Error errors={errors}>Could not load profile</Error>
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
export default Profile

function useProfile() {
  const api = useApi()
  const action = useCallback(
    async (init?: RequestInit): Promise<UserProfile> => {
      const response = await api.get('/auth/me', init)
      return response.json()
    },
    [api],
  )
  const { data: profile, loading, errors } = useAsyncLoad(action)

  return { profile, loading, errors }
}
