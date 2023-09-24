import type { LayoutServerLoad } from './$types'

type LoggedInUser = { loggedIn: true; displayName: string }
type LoggedOutUser = { loggedIn: false }

type UserData = LoggedInUser | LoggedOutUser

export const load: LayoutServerLoad = ({ locals }) => {
  const user: UserData = locals.jwt
    ? {
        loggedIn: true,
        displayName: locals.jwt.displayName,
      }
    : {
        loggedIn: false,
      }

  return { user }
}
