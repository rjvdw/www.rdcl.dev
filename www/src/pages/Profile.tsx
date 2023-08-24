import { FunctionComponent } from 'preact'
import { useCallback, useId, useState } from 'preact/hooks'
import { ActiveRoute } from '../components/ActiveRoute'
import { LoginRequired } from '../components/LoginRequired'
import { PageTitle } from '../components/PageTitle'
import { useFormHandler } from '../util/form'
import { asParams, getBody, useApi } from '../util/http'
import { useAsyncLoad } from '../util/useAsyncLoad'

type UserProfile = {
  name: string
  email: string
}

type ProfileMode = 'view' | 'edit'

export const Profile: FunctionComponent = () => {
  const { profile, loading, errors, setData } = useLoadProfile()
  const { id, mode, pending, error, edit, onReset, onSubmit } =
    useProfile(setData)

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
      {profile &&
        (mode === 'view' ? (
          <>
            <dl>
              <dt>E-mail</dt>
              <dd>{profile.email}</dd>
              <dt>Name</dt>
              <dd>{profile.name}</dd>
            </dl>

            <button class="link" onClick={edit}>
              Edit profile
            </button>
          </>
        ) : (
          <form onSubmit={onSubmit} onReset={onReset} disabled={pending}>
            <section class="form-grid">
              <label for={`${id}:email`}>Email</label>
              <input
                id={`${id}:email`}
                readonly
                type="email"
                value={profile.email}
              />

              <label htmlFor={`${id}:name`}>Name</label>
              <input
                id={`${id}:name`}
                type="string"
                name="name"
                value={profile.name}
              />

              <button data-start="2">Save</button>
              <button type="reset" data-start="2">
                Cancel
              </button>

              {error !== undefined && (
                <p data-start="2" class="error">
                  Could not log in: {error}
                </p>
              )}
            </section>
          </form>
        ))}
    </>
  )
}

function useProfile(setData: (data: UserProfile) => void) {
  const id = useId()
  const [mode, setMode] = useState<ProfileMode>('view')
  const [pending, setPending] = useState(false)
  const api = useApi(true)

  const edit = useCallback(() => setMode('edit'), [setMode])

  const onReset = useCallback((event: Event) => {
    event.preventDefault()
    setMode('view')
  }, [])

  const { error, onSubmit } = useFormHandler(async (event, { setError }) => {
    const body = asParams(event.target)

    setPending(true)
    setError(undefined)
    try {
      const response = await api.patch('/auth/me', body)
      const profile = await getBody(response, isUserProfile)
      setData(profile)
      setMode('view')
    } finally {
      setPending(false)
    }
  }, [])

  return {
    id,
    mode,
    pending,
    error,
    edit,
    onReset,
    onSubmit,
  }
}

function useLoadProfile() {
  const api = useApi(true)
  const action = useCallback(
    async (init?: RequestInit): Promise<UserProfile> =>
      getBody(await api.get('/auth/me', init), isUserProfile),
    [api],
  )
  const { data: profile, loading, errors, setData } = useAsyncLoad(action)

  return { profile, loading, errors, setData }
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
