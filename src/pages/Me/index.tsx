import React from 'react'
import { ActiveRoute } from '../../components/ActiveRoute'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'
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
  const { data: profile, loading, error } = useAsyncLoad(callApi)

  return { profile, loading, error }
}

async function callApi(): Promise<Profile> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Call to API failed with error: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}
