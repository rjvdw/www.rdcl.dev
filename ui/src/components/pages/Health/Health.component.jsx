import React, { useState } from 'react'
import { format, formatISO, parseISO } from 'date-fns'
import { axios } from '../../../axios'
import { formatDate } from '../../../util/formatters'
import { preventDefault } from '../../../util/component'

export const Health = () => {
  const [data, setData] = useState([])
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [newEntry, setNewEntry] = useState({
    timestamp: new Date(),
    weight: '',
  })
  const setNewEntryValue = (key, val) => {
    if (key === 'date') {
      key = 'timestamp'
      val = combineDateAndTime(parseISO(val), newEntry.timestamp)
    } else if (key === 'time') {
      key = 'timestamp'
      val = combineDateAndTime(newEntry.timestamp, parseTime(val))
    }
    setNewEntry({ ...newEntry, [key]: val })
  }

  const fetch = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams()
      if (from) query.append('from', from)
      if (to) query.append('to', to)
      const response = await axios.get(`/health?${ query.toString() }`)
      setData(response.data.entries)
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setInitialized(true)
      setLoading(false)
    }
  }

  const saveNewEntry = async () => {
    setSaving(true)
    try {
      await axios.post('/health', {
        timestamp: formatISO(newEntry.timestamp),
        weight: newEntry.weight,
      })
      await fetch()
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!initialized && !loading) {
    fetch()
  }

  return <>
    <h1>Health</h1>

    { error && <p>Hm... Het lijkt er op dat er iets mis is gegaan 🤔: { error }</p> }

    <section>
      <h2>Haal data op</h2>
      <form onSubmit={ preventDefault(fetch) }>
        <rdcl-input-grid>
          <label htmlFor="health-range-from">From</label>
          <input
            id="health-range-from"
            type="date"
            value={ from }
            onChange={ event => setFrom(event.target.value) }
            required
          />

          <label htmlFor="health-range-to">To</label>
          <input
            id="health-range-to"
            type="date"
            value={ to }
            onChange={ event => setTo(event.target.value) }
            required
          />

          <span/>
          <button>Haal op</button>
        </rdcl-input-grid>
      </form>
    </section>

    <section>
      <h2>Voer nieuwe regel in</h2>
      <form onSubmit={ preventDefault(saveNewEntry) }>
        <rdcl-input-grid>
          <label htmlFor="health-new-date">Datum</label>
          <rdcl-combi-input mode="balanced">
            <input
              id="health-new-date"
              type="date"
              value={ formatISO(newEntry.timestamp, { representation: 'date' }) }
              onChange={ event => setNewEntryValue('date', event.target.value) }
              required
              disabled={ saving }
            />
            <input
              id="health-new-time"
              type="time"
              value={ format(newEntry.timestamp, 'HH:mm') }
              onChange={ event => setNewEntryValue('time', event.target.value) }
              required
              disabled={ saving }
            />
          </rdcl-combi-input>

          <label htmlFor="health-new-weight">Gewicht</label>
          <input
            id="health-new-weight"
            type="numeric"
            inputMode="decimal"
            value={ newEntry.weight }
            onChange={ event => setNewEntryValue('weight', +event.target.value) }
            required
            disabled={ saving }
          />

          <span/>
          <button disabled={ saving }>Sla op</button>
        </rdcl-input-grid>
      </form>
    </section>

    { loading && <p>Een moment geduld, ik ben alles aan het ophalen ⏳.</p> }

    { initialized && <>
      <hr/>
      <table>
        <thead>
        <tr>
          <th>Datum</th>
          <th>Gewicht</th>
        </tr>
        </thead>
        <tbody>
        { data.map(entry => (
          <tr key={ entry.timestamp }>
            <td>{ formatDate(entry.timestamp) }</td>
            <td data-numeric>{ entry.weight.toFixed(1) }</td>
          </tr>
        )) }
        </tbody>
      </table>
    </> }
  </>
}

/**
 * @param {Date} date
 * @param {Date} time
 * @returns {Date}
 */
function combineDateAndTime(date, time) {
  return new Date(
    date.getFullYear(), date.getMonth(), date.getDate(),
    time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()
  )
}

/**
 * @param {string} str
 * @returns {Date}
 */
function parseTime(str) {
  const [hours, minutes, seconds] = str.split(':')
  const d = new Date()
  d.setHours(+hours)
  d.setMinutes(+minutes)
  if (seconds) {
    d.setSeconds(...seconds.split('.').map(Number))
  } else {
    d.setSeconds(0)
  }
  return d
}
