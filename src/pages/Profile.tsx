import { FunctionComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import { ActiveRoute } from '../components/ActiveRoute'
import { LoginRequired } from '../components/LoginRequired'
import { PageTitle } from '../components/PageTitle'
import { getBody, useApi } from '../util/http'
import { useAsyncLoad } from '../util/useAsyncLoad'

type UserProfile = {
  name: string
  email: string
}

export const Profile: FunctionComponent = () => {
  const { profile, loading, errors } = useProfile()

  return (
    <>
      <LoginRequired />
      <ActiveRoute>profile</ActiveRoute>
      <PageTitle>profile</PageTitle>

      <h1>Profile</h1>

      {loading && <p>Loading profile...</p>}
      {errors.length > 0 && (
        <p class="error">Could not load profile: {errors.join(', ')}</p>
      )}
      {profile && (
        <dl>
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
  const api = useApi(true)
  const action = useCallback(
    async (init?: RequestInit): Promise<UserProfile> =>
      getBody(await api.get('/auth/me', init), isUserProfile),
    [api],
  )
  const { data: profile, loading, errors } = useAsyncLoad(action)

  return { profile, loading, errors }
}

function isUserProfile(body: unknown): body is UserProfile {
  return (
    typeof body === 'object' &&
    body !== null &&
    'name' in body &&
    typeof body.name === 'string' &&
    'email' in body &&
    typeof body.email === 'string'
  )
}
