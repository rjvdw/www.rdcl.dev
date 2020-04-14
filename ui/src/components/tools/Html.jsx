import React from 'react'

const INPUT_ATTRS = {
  inputmode: ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
  enterkeyhint: ['enter', 'done', 'go', 'next', 'previous', 'search', 'send'],
}

export const Html = () => <>
  <h1>HTML Elements</h1>

  <rdcl-input-grid>
    { Object.entries(INPUT_ATTRS).flatMap(([attr, vals]) => vals.map(val =>
      <React.Fragment key={ `${ attr }-${ val }` }>
        <label htmlFor={ `${ attr }-${ val }` }><code>{ attr }="{ val }"</code></label>
        <input id={ `${ attr }-${ val }` } type="text" { ...{ [attr]: val } }/>
      </React.Fragment>
    )) }
  </rdcl-input-grid>
</>
