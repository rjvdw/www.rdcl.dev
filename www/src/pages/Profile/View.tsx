import { settings } from '../../state/settings'
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

      <h2>Settings</h2>

      <dl>
        <dt>Date style</dt>
        <dd>{settings.value.dateStyle}</dd>
        <dt>Time style</dt>
        <dd>{settings.value.timeStyle}</dd>
        <dt>Clock style</dt>
        <dd>{settings.value.hour12 ? '12-hour clock' : '24-hour clock'}</dd>
      </dl>

      <p>
        <button class="link" onClick={() => setMode('edit')}>
          Edit profile
        </button>
      </p>
    </>
  )
}
