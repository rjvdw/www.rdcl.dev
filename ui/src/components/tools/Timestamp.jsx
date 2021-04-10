import React, { useState } from 'react'

export const Timestamp = () => {
  const [ms, setMs] = useState(Date.now())
  const [timestamp, setTimestamp] = useState(ms / 1000)
  const [iso, setIso] = useState(formatIso(ms))

  return <>
    <h1>Timestamp</h1>

    <rdcl-input-grid>
      <label htmlFor="iso">ISO</label>
      <input
        id="iso"
        value={ iso }
        onChange={ updateIso(setMs, setTimestamp, setIso) }
        onBlur={ updateIso(setMs, setTimestamp, setIso, true) }
        type="text"
      />

      <label htmlFor="ms">Timestamp (ms)</label>
      <input
        id="ms"
        value={ ms }
        onChange={ updateMs(setMs, setTimestamp, setIso) }
        onBlur={ updateMs(setMs, setTimestamp, setIso, true) }
        type="text"
        inputMode="numeric"
      />

      <label htmlFor="timestamp">Timestamp (s)</label>
      <input
        id="timestamp"
        value={ timestamp }
        onChange={ updateTimestamp(setMs, setTimestamp, setIso) }
        onBlur={ updateTimestamp(setMs, setTimestamp, setIso, true) }
        type="text"
        inputMode="decimal"
      />
    </rdcl-input-grid>
  </>
}

export default Timestamp

function updateIso(setMs, setTimestamp, setIso, cleanUp = false) {
  return (event) => {
    const ms = Date.parse(event.target.value)

    if (Number.isNaN(ms)) {
      setIso(event.target.value)
      setMs('invalid iso string')
      setTimestamp('invalid iso string')
    } else {
      setMs(ms)
      setTimestamp(ms / 1000)
      if (cleanUp) {
        setIso(formatIso(ms))
      } else {
        setIso(event.target.value)
      }
    }
  }
}

function updateMs(setMs, setTimestamp, setIso, cleanUp = false) {
  return (event) => {
    const ms = parseInt(event.target.value)

    if (Number.isNaN(ms)) {
      setIso('invalid timestamp')
      setMs(event.target.value)
      setTimestamp('invalid timestamp')
    } else {
      if (cleanUp) {
        setMs(ms)
      } else {
        setMs(event.target.value)
      }
      setTimestamp(ms / 1000)
      setIso(formatIso(ms))
    }
  }
}

function updateTimestamp(setMs, setTimestamp, setIso, cleanUp = false) {
  return (event) => {
    const timestamp = parseFloat(event.target.value)

    if (Number.isNaN(timestamp)) {
      setIso('invalid timestamp')
      setMs('invalid timestamp')
      setTimestamp(event.target.value)
    } else {
      const ms = Math.floor(timestamp * 1000)
      console.log(ms, timestamp, ms / 1000)
      setMs(ms)
      if (cleanUp) {
        setTimestamp(ms / 1000)
      } else {
        setTimestamp(event.target.value)
      }
      setIso(formatIso(ms))
    }
  }
}

function formatIso(time) {
  try {
    return new Date(time).toISOString()
  } catch (e) {
    return "invalid time"
  }
}
