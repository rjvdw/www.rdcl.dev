import React from 'react'
import { PageHeader } from '../PageHeader'
import { Sidemenu } from '../Sidemenu'
import { ScreenType } from '../../modules/screen'

type AppProps = {
  screenType: ScreenType,
}

export const App: React.FunctionComponent<AppProps> = ({ screenType }) => <>
  <rdcl-grid screentype={ screenType }>
    <PageHeader slot="header" screentype={ screenType }/>

    { screenType === 'mobile' ? '' : (
      <Sidemenu slot="sidemenu" screentype={ screenType }/>
    ) }

    <main>
      <h1>Hello, World!</h1>
    </main>
  </rdcl-grid>

  { screenType === 'mobile' ? (
    <Sidemenu slot="sidemenu" screentype={ screenType }/>
  ) : '' }
</>
