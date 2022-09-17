import React, { Fragment } from 'react'
import { Title } from '../components/Title'

const INPUT_ATTRS = {
  inputMode: ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
  enterKeyHint: ['enter', 'done', 'go', 'next', 'previous', 'search', 'send'],
  autoCapitalize: ['off', 'none', 'on', 'sentences', 'words', 'characters'],
}

export const Html = () => <>
  <Title prefix={ ['tools'] }>html</Title>
  <h1>HTML Elements</h1>

  <h2>Input Attributes</h2>
  <rdcl-input-grid>
    { Object.entries(INPUT_ATTRS).flatMap(([attr, vals]) => (
      <Fragment key={ attr }>
        <h3 data-span={ 2 }>{ attr }</h3>
        { vals.map(val => (
          <Fragment key={ val }>
            <label htmlFor={ `${ attr }-${ val }` }><code>{ val }</code></label>
            <input id={ `${ attr }-${ val }` } type="text" { ...{ [attr]: val } }/>
          </Fragment>
        )) }
      </Fragment>
    )) }
  </rdcl-input-grid>
</>

export default Html
