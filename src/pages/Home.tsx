import React from 'react'
import { ActiveRoute } from '../components/ActiveRoute'
import { Title } from '../components/Title'

export const Home = () => (
  <>
    <Title />
    <ActiveRoute>home</ActiveRoute>
    <h1>rdcl.dev</h1>

    <p>
      Welcome to this page. I use this website to dump random stuff.{' '}
      <a href="https://www.ruud.online">You can find my homepage here</a>.
    </p>
  </>
)
