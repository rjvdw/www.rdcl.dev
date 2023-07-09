import React from 'react'

export const Auth = Object.assign(
  {},
  {
    Login: React.lazy(() => import('./Login')),
    VerifyLogin: React.lazy(() => import('./VerifyLogin')),
    Logout: React.lazy(() => import('./Logout')),
    Session: React.lazy(() => import('./Session')),
    Profile: React.lazy(() => import('./Profile')),
  },
)
