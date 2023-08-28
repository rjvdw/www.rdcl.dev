import { UserProfile } from './types'
import { useAuthenticatorManager } from './useAuthenticatorManager'

type AuthenticatorsProps = {
  profile: UserProfile
}

export const Authenticators = ({ profile }: AuthenticatorsProps) => {
  const am = useAuthenticatorManager()

  return (
    <>
      <h2>Authenticators</h2>

      {profile.authenticators.length === 0 ? (
        <p>No authenticators registered</p>
      ) : (
        <div class="responsive-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profile.authenticators.map((authenticator) => (
                <tr key={authenticator.id}>
                  <td>{authenticator.name ?? <i>Unnamed authenticator</i>}</td>
                  <td>
                    <div class="actions">
                      <button onClick={() => am.remove(authenticator)}>
                        Delete
                      </button>
                      <button onClick={() => am.update(authenticator)}>
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p>
        <button onClick={am.add}>Add authenticator</button>
      </p>
    </>
  )
}
