import React, { FunctionComponent } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

type Example = {
  path: string
  element: React.ReactNode
}

export function useExamples(...examples: Example[]) {
  return useRoutes([
    {
      path: '/hex-grid',
      element: <Outlet />,
      children: examples,
    },
  ])
}

export function example(path: string, Element: FunctionComponent): Example {
  return { path, element: <Element /> }
}
