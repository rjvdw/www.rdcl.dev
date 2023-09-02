import { useProfileContext } from './context'
import { UserProfile } from './types'
import { useEditProfile } from './useEditProfile'

type EditProps = {
  profile: UserProfile
}

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
  )
}
