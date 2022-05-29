import React, { ChangeEvent, useId, useState } from 'react'
import { HookSetter } from '../../util/types'

type SetMs = HookSetter<number | string>
type SetTimestamp = HookSetter<number | string>
type SetIso = HookSetter<string>

export const Timestamp = () => {
  const id = useId()

  const now = Date.now()
  const [ms, setMs] = useState<number | string>(now)
  const [timestamp, setTimestamp] = useState<number | string>(now / 1000)
  const [iso, setIso] = useState(formatIso(now))

  return <>
    <h1>Timestamp</h1>

    <rdcl-input-grid>
      <label htmlFor={ `${ id }:iso` }>ISO</label>
      <input
        id={ `${ id }:iso` }
        value={ iso }
        onChange={ updateIso(setMs, setTimestamp, setIso) }
        onBlur={ updateIso(setMs, setTimestamp, setIso, true) }
        type="text"
      />

      <label htmlFor={ `${ id }:ms` }>Timestamp (ms)</label>
      <input
        id={ `${ id }:ms` }
        value={ ms }
        onChange={ updateMs(setMs, setTimestamp, setIso) }
        onBlur={ updateMs(setMs, setTimestamp, setIso, true) }
        type="text"
        inputMode="numeric"
      />

      <label htmlFor={ `${ id }:timestamp` }>Timestamp (s)</label>
      <input
        id={ `${ id }:timestamp` }
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

function updateIso(setMs: SetMs, setTimestamp: SetTimestamp, setIso: SetIso, cleanUp: boolean = false) {
  return (event: ChangeEvent<HTMLInputElement>) => {
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

function updateMs(setMs: SetMs, setTimestamp: SetTimestamp, setIso: SetIso, cleanUp: boolean = false) {
  return (event: ChangeEvent<HTMLInputElement>) => {
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

function updateTimestamp(setMs: SetMs, setTimestamp: SetTimestamp, setIso: SetIso, cleanUp = false) {
  return (event: ChangeEvent<HTMLInputElement>) => {
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

function formatIso(time: number | string) {
  try {
    return new Date(time).toISOString()
  } catch (e) {
    return 'invalid time'
  }
}
