import { useMemo } from 'preact/hooks'
import { DateTime } from '../../components/DateTime'
import { Authenticator, UserProfile } from './types'
import { useAuthenticatorManager } from './useAuthenticatorManager'

type AuthenticatorsProps = {
  profile: UserProfile
}

export const Authenticators = ({ profile }: AuthenticatorsProps) => {
  const am = useAuthenticatorManager()

  const authenticators = useMemo(() => {
    const copy = [...profile.authenticators]
    copy.sort(sortAuthenticators)
    return copy
  }, [profile.authenticators])

  return (
    <>
      <h2>Authenticators</h2>

      {authenticators.length === 0 ? (
        <p>No authenticators registered</p>
      ) : (
        <div class="responsive-table-wrapper no-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last used</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authenticators.map((authenticator) => (
                <tr key={authenticator.id}>
                  <td>{authenticator.name ?? <i>Unnamed authenticator</i>}</td>
                  <td>
                    {authenticator.lastUsed ? (
                      <DateTime value={authenticator.lastUsed} />
                    ) : (
                      <i>Never used to log in</i>
                    )}
                  </td>
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

/**
 * Sorts authenticators by most recently used first, by name if no last usage is known, or by id if no name is known.
 */
function sortAuthenticators(
  this: void,
  a: Authenticator,
  b: Authenticator,
): number {
  if (a.lastUsed && b.lastUsed) {
    return -a.lastUsed.localeCompare(b.lastUsed)
  }

  if (a.lastUsed) return -1
  if (b.lastUsed) return 1

  if (a.name && b.name) {
    return a.name.localeCompare(b.name)
  }

  if (a.name) return 1
  if (b.name) return -1

  return a.id.localeCompare(b.id)
}
