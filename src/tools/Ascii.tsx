import React, { useId } from 'react'
import './Ascii.styles.sass'
import { Title } from '../components/Title'
import { useAscii } from './Ascii.hooks'

const ASCII_TABLE = Array(128).fill(0)
  .map((_, idx) => idx)
  .map(x => ({
    decimal: x.toString(10),
    binary: x.toString(2).padStart(8, '0'),
    hex: x.toString(16).padStart(2, '0'),
    character: (x >= 32 && x < 127) ? String.fromCodePoint(x) : '',
  }))

export const Ascii = () => {
  const id = useId()

  const {
    text, setText,
    ascii, setAscii,
    radix, setRadix,
    error,
  } = useAscii()

  return <>
    <Title prefix="tools">ascii</Title>
    <h1>ASCII Converter</h1>

    <h2><label htmlFor={ `${ id }:plain` }>Plain Text</label></h2>
    <textarea
      id={ `${ id }:plain` }
      data-testid="ascii-converter-plain-text"
      className="ascii-conversion-input"
      value={ text }
      onChange={ setText }
      rows={ 10 }
      cols={ 40 }
    />

    <h2><label htmlFor={ `${ id }:ascii` }>ASCII</label></h2>
    <textarea
      id={ `${ id }:ascii` }
      data-testid="ascii-converter-ascii"
      className="ascii-conversion-input"
      value={ ascii }
      onChange={ setAscii }
      rows={ 10 }
      cols={ 40 }
    />
    <p className="ascii-conversion-radix">
      <label>
        <input
          type="radio"
          data-testid="ascii-converter-radix-2"
          name="ascii-converter-radix"
          value={ 2 }
          checked={ radix === 2 }
          onChange={ setRadix }
        /> binary
      </label>

      <label>
        <input
          type="radio"
          data-testid="ascii-converter-radix-10"
          name="ascii-converter-radix"
          value={ 10 }
          checked={ radix === 10 }
          onChange={ setRadix }
        /> decimal
      </label>

      <label>
        <input
          type="radio"
          data-testid="ascii-converter-radix-16"
          name="ascii-converter-radix"
          value={ 16 }
          checked={ radix === 16 }
          onChange={ setRadix }
        /> hex
      </label>
    </p>

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
