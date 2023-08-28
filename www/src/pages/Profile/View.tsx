import { useProfileContext } from './context'
import { UserProfile } from './types'

type ViewProps = {
  profile: UserProfile
}

export const View = ({ profile }: ViewProps) => {
  const { setMode } = useProfileContext()

  return (
    <>
      <dl>
        <dt>E-mail</dt>
        <dd>{profile.email}</dd>
        <dt>Name</dt>
        <dd>{profile.name}</dd>
      </dl>

      <p>
        <button class="link" onClick={() => setMode('edit')}>
          Edit profile
        </button>
      </p>
    </>
  )
}
