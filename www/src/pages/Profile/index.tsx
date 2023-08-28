import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { LoginRequired } from '../../components/LoginRequired'
import { NestedRoutes } from '../../components/NestedRoutes'
import { PageTitle } from '../../components/PageTitle'
import { Authenticators } from './Authenticators'
import { Edit } from './Edit'
import { View } from './View'
import { Provider, useSetupContext } from './context'

const ProfileComponent = NestedRoutes('profile')

const Index: FunctionComponent = () => {
  const ctx = useSetupContext()

  return (
    <>
      <LoginRequired />
      <ActiveRoute>profile</ActiveRoute>
      <PageTitle />

      <Provider value={ctx}>
        <h1>Profile</h1>

        {ctx.state.type === 'loading' && <p>Loading profile...</p>}
        {ctx.state.type === 'error' && (
          <p class="error">Could not load profile: {ctx.state.error}</p>
        )}
        {ctx.state.type === 'complete' && (
          <>
            {ctx.mode === 'view' ? (
              <>
                <View profile={ctx.state.profile} />
                <Authenticators profile={ctx.state.profile} />
              </>
            ) : (
              <Edit profile={ctx.state.profile} />
            )}
          </>
        )}
      </Provider>
    </>
  )
}

export const Profile = Object.assign(ProfileComponent, {
  Index,
})
