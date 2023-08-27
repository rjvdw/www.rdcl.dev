import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { LoginRequired } from '../../components/LoginRequired'
import { NestedRoutes } from '../../components/NestedRoutes'
import { PageTitle } from '../../components/PageTitle'
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

        {ctx.state === 'loading' && <p>Loading profile...</p>}
        {ctx.state === 'error' && (
          <p class="error">Could not load profile: {ctx.error}</p>
        )}
        {ctx.state === 'complete' &&
          (ctx.mode === 'view' ? (
            <View profile={ctx.profile} />
          ) : (
            <Edit profile={ctx.profile} />
          ))}
      </Provider>
    </>
  )
}

export const Profile = Object.assign(ProfileComponent, {
  Index,
})
