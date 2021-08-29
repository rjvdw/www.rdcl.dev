import React, { useRef, useState } from 'react'
import qr from 'qrcode'
import { useAutoFocusRef } from '../../util/hooks'

const OUTPUT_WIDTH = 250
const OUTPUT_HEIGHT = 250

export const Qr = () => {
  const [data, setData] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const inputRef = useAutoFocusRef<HTMLInputElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const reset = () => {
    if (canvasRef.current !== null) {
      canvasRef.current.width = OUTPUT_WIDTH
      canvasRef.current.height = OUTPUT_HEIGHT
      canvasRef.current.style.width = ''
      canvasRef.current.style.height = ''
      canvasRef.current.getContext('2d')?.clearRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT)
    }
  }

  const setQr = (data: string) => {
    setData(data)

    if (data) {
      qr.toCanvas(canvasRef.current, data, setError)
    } else {
      reset()
    }
  }

  return <>
    <h1>QR</h1>

    <rdcl-input-grid>
      <label htmlFor="qr-data">Data:</label>
      <input
        id="qr-data"
        ref={ inputRef }
        type="text"
        autoFocus
        value={ data }
        onChange={ event => setQr(event.target.value) }
      />
    </rdcl-input-grid>

    { error !== null && <p style={ { margin: '1rem 0', color: 'red' } }>Error: { error.message }</p> }

    <canvas ref={ canvasRef } style={ {
      display: 'block',
      background: '#fff',
      border: 'thin dashed grey',
      margin: '1rem auto 0',
    } } width={ OUTPUT_WIDTH } height={ OUTPUT_HEIGHT }/>
  </>
}

export default Qr
