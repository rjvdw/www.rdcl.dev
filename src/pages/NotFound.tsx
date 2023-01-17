import React from 'react'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'

export const NotFound = () => (
  <>
    <Title>not found</Title>
    <ActiveRoute />

    <h1>Page not found</h1>

    <p>The page you were trying to reach does not exist.</p>
  </>
)
