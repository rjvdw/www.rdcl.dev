import React from 'react'
import { useSelector } from 'react-redux'
import { PageHeader } from './PageHeader'
import { Sidemenu } from './Sidemenu'
import { selectScreenType } from '../modules/screen'

export const App: React.FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)

  return <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader/>

      { screenType === 'mobile' ? '' : <Sidemenu/> }

      <main>
        <h1>Hello, World!</h1>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? <Sidemenu/> : '' }
  </>
}
