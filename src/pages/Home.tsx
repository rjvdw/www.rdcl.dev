import { FunctionComponent } from 'preact'
import { Meta } from '../components/Meta.tsx'

export const Home: FunctionComponent = () => (
  <>
    <Meta activeRoute="home" pageTitle="home" />

    <h1>Hello, World!</h1>
  </>
)
