import { settings } from '../../state/settings'
import { DATE_STYLES, TIME_STYLES } from './constants'
import { useProfileContext } from './context'
import { UserProfile } from './types'
import { useEditProfile } from './useEditProfile'

type EditProps = {
  profile: UserProfile
}

const SAMPLE_DATE = new Date(Date.parse('1970-01-01T12:00:00'))

export const Edit = ({ profile }: EditProps) => {
  const { update, setMode } = useProfileContext()
  const { onSubmit, pending, error } = useEditProfile((profile) => {
    update(profile)
    setMode('view')
  })

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setMode('view')}
      disabled={pending}
    >
      <section class="form-grid">
        <label for="edit-profile:email">Email</label>
        <input
          id="edit-profile:email"
          readonly
          type="email"
          value={profile.email}
        />

        <label for="edit-profile:name">Name</label>
        <input
          id="edit-profile:name"
          type="string"
          name="name"
          defaultValue={profile.name}
        />

        <label for="edit-profile:settings:date-style">Date style</label>
        <select
          id="edit-profile:settings:date-style"
          class="input"
          name="profile:dateStyle"
          defaultValue={settings.value.dateStyle}
        >
          <option value="">Reset to default</option>
          {DATE_STYLES.map((dateStyle) => (
            <option key={dateStyle} value={dateStyle}>
              {dateStyle} ({fmt({ dateStyle })})
            </option>
          ))}
        </select>

        <label for="edit-profile:settings:time-style">Time style</label>
        <select
          id="edit-profile:settings:time-style"
          class="input"
          name="profile:timeStyle"
          defaultValue={settings.value.timeStyle}
        >
          <option value="">Reset to default</option>
          {TIME_STYLES.map((timeStyle) => (
            <option key={timeStyle} value={timeStyle}>
              {timeStyle} ({fmt({ timeStyle })})
            </option>
          ))}
        </select>

        <label for="edit-profile:settings:hour12">Clock style</label>
        <select
          id="edit-profile:settings:hour12"
          class="input"
          name="profile:hour12"
          defaultValue={settings.value.hour12 ? 'true' : 'false'}
        >
          <option value="">Reset to default</option>
          <option value="true">Use 12-hour clock</option>
          <option value="false">Use 24-hour clock</option>
        </select>

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
  )
}

function fmt(options: Intl.DateTimeFormatOptions): string {
  return SAMPLE_DATE.toLocaleString(document.documentElement.lang, options)
}
