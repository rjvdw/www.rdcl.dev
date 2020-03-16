import React from 'react'
import { useTitle } from '../util'

const INPUTMODES = [
  'none',
  'numeric', 'decimal',
  'tel', 'email', 'url',
  'search',
]

export const Html = () => {
  useTitle('html elements', 'tools')
  return <>
    <h1>HTML Elements</h1>

    <rdcl-input-grid>
      { INPUTMODES.map(im => <React.Fragment key={ `inputmode-${ im }` }>
        <label htmlFor={ `inputmode-${ im }` }><code>inputmode="{ im }"</code></label>
        <input id={ `inputmode-${ im }` } type="text" inputMode={ im }/>
      </React.Fragment>) }
    </rdcl-input-grid>
  </>
}
