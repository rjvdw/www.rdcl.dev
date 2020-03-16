import React from 'react'
import { useTitle } from '../../util'

export const Home = () => {
  useTitle()

  return <>
    <h1>rdcl.dev</h1>

    <p>Welcome to this page. I use this website to dump random stuff. <a href="https://www.ruud.online">You can find my
      homepage here</a>.</p>
  </>
}
