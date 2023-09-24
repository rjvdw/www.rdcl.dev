import type { Actions } from './$types'

export const actions = {
  async default({ locals, cookies }) {
    delete locals.jwt
    cookies.delete('jwt', {
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    return {
      success: true,
    }
  },
} satisfies Actions
