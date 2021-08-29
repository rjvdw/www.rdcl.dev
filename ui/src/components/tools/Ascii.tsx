import React, { ChangeEvent, useState } from 'react'
import './Ascii.styles.sass'

const ASCII_TABLE = Array(128).fill(0)
  .map((_, idx) => idx)
  .map(x => ({
    decimal: x.toString(10),
    binary: x.toString(2).padStart(8, '0'),
    hex: x.toString(16).padStart(2, '0'),
    character: (x >= 32 && x < 127) ? String.fromCodePoint(x) : '',
  }))

type StateType = {
  text: string,
  ascii: string,
  error?: Error,
}

export const Ascii = () => {
  const [{ text, ascii, error }, setState] = useState<StateType>({ text: '', ascii: '' })

  const setText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value
    const ascii = toAscii(text)

    setState({ text, ascii, error: undefined })
  }

  const setAscii = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const ascii = event.target.value
    let text = ''
    let error = undefined

    try {
      text = fromAscii(ascii)
    } catch (err) {
      if (err instanceof Error) {
        error = err
      } else {
        error = new Error('Unknown error')
      }
    }

    setState({ text, ascii, error })
  }

  return <>
    <h1>ASCII Converter</h1>

    <h2><label htmlFor="ascii-converter-plain-text">Plain Text</label></h2>
    <textarea
      id="ascii-converter-plain-text"
      className="ascii-conversion-input"
      value={ text }
      onChange={ setText }
      rows={ 10 }
      cols={ 40 }
    />

    <h2><label htmlFor="ascii-converter-plain-text">ASCII</label></h2>
    <textarea
      id="ascii-converter-ascii"
      className="ascii-conversion-input"
      value={ ascii }
      onChange={ setAscii }
      rows={ 10 }
      cols={ 40 }
    />

    { error ? <section className="error-message">
      <h2>Error</h2>
      <p>{ error.message }</p>
    </section> : '' }

    <h2>ASCII Table</h2>

    <table className="ascii-table">
      <thead>
      <tr>
        <th><abbr title="Decimal">Dec</abbr></th>
        <th>Binary</th>
        <th>Hex</th>
        <th><abbr title="Character">Char</abbr></th>
      </tr>
      </thead>
      <tbody>
      { ASCII_TABLE.map(row => <tr key={ row.decimal }>
        <td>{ row.decimal }</td>
        <td>{ row.binary }</td>
        <td>{ row.hex }</td>
        <td>{ row.character }</td>
      </tr>) }
      </tbody>
    </table>
  </>
}

export default Ascii

function toAscii(text: string): string {
  return text
    .split('')
    .map(x => x.codePointAt(0))
    .map(x => x?.toString(2) || '')
    .map(x => x.padStart(8, '0'))
    .join(' ')
}

function fromAscii(ascii: string): string {
  return ascii
    .split(' ')
    .filter(x => x !== '')
    .map(x => parseInt(x, 2))
    .map(x => String.fromCodePoint(x))
    .join('')
}
