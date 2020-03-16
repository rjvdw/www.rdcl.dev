import React, { useRef, useState } from 'react'
import qr from 'qrcode'
import { useTitle } from '../util'

const OUTPUT_WIDTH = 250
const OUTPUT_HEIGHT = 250

export const Qr = () => {
  useTitle('qr', 'tools')
  const [data, setData] = useState('')
  const [error, setError] = useState(null)
  const ref = useRef(null)

  const reset = () => {
    ref.current.width = OUTPUT_WIDTH
    ref.current.height = OUTPUT_HEIGHT
    ref.current.style.width = ''
    ref.current.style.height = ''
    ref.current.getContext('2d').clearRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT)
  }

  const setQr = data => {
    setData(data)

    if (data) {
      qr.toCanvas(ref.current, data, setError)
    } else {
      reset()
    }
  }

  return <>
    <h1>QR</h1>

    <rdcl-input-grid>
      <label htmlFor="qr-data">Data:</label>
      <input
        type="text"
        id="qr-data"
        autoFocus
        value={ data }
        onChange={ event => setQr(event.target.value) }
      />
    </rdcl-input-grid>

    { error !== null && <p style={ { margin: '1rem 0', color: 'red' } }>Error: { error.message }</p> }

    <canvas ref={ ref } style={ {
      display: 'block',
      background: '#fff',
      border: 'thin dashed grey',
      margin: '1rem auto 0',
    } } width={ OUTPUT_WIDTH } height={ OUTPUT_HEIGHT }/>
  </>
}
