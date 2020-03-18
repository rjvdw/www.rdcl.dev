import React, { useState } from 'react'
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react'
import { differenceInDays, format, formatISO, parseISO } from 'date-fns'
import { axios } from '../../../axios'
import { formatDate } from '../../../util/formatters'
import { preventDefault } from '../../../util/component'
import { useTitle } from '../../util'

const { CanvasJS, CanvasJSChart } = CanvasJSReact

export const Health = () => {
  useTitle('health')

  const [data, setData] = useState([])
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [newEntry, setNewEntry] = useState({
    date: formatISO(new Date(), { representation: 'date' }),
    time: format(new Date(), 'HH:mm'),
    weight: '',
  })
  const setNewEntryValue = (key, val) => {
    setNewEntry({ ...newEntry, [key]: val })
  }

  const fetch = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams()
      if (from) query.append('from', from)
      if (to) query.append('to', to)
      const response = await axios.get(`/health?${ query.toString() }`)
      setData(response.data.entries.map(entry => ({
        ...entry,
        timestamp: parseISO(entry.timestamp),
      })))
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
        timestamp: formatISO(combineDateAndTime(newEntry.date, newEntry.time)),
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
          />

          <label htmlFor="health-range-to">To</label>
          <input
            id="health-range-to"
            type="date"
            value={ to }
            onChange={ event => setTo(event.target.value) }
          />

          <button data-start={ 2 }>Haal op</button>
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
              value={ newEntry.date }
              onChange={ event => setNewEntryValue('date', event.target.value) }
              required
              disabled={ saving }
            />
            <input
              id="health-new-time"
              type="time"
              value={ newEntry.time }
              onChange={ event => setNewEntryValue('time', event.target.value) }
              required
              disabled={ saving }
            />
          </rdcl-combi-input>

          <label htmlFor="health-new-weight">Gewicht</label>
          <input
            id="health-new-weight"
            type="number"
            inputMode="decimal"
            step={ .1 }
            value={ newEntry.weight }
            onChange={ event => setNewEntryValue('weight', +event.target.value) }
            required
            disabled={ saving }
          />

          <button data-start={ 2 } disabled={ saving }>Sla op</button>
        </rdcl-input-grid>
      </form>
    </section>

    { loading && <p>Een moment geduld, ik ben alles aan het ophalen ⏳.</p> }

    { initialized && <>
      <hr/>

      <Chart title="Gewicht" field="weight" data={ data }/>

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

const Chart = ({ data, field, window = 7, title, ...opts }) => {
  let lastEntries = []
  const aggr = data.reduce((aggregates, entry, idx) => {
    const min = aggregates.min === null ? entry[field] : Math.min(aggregates.min, entry[field])
    const max = aggregates.max === null ? entry[field] : Math.max(aggregates.max, entry[field])

    lastEntries = [entry].concat(lastEntries)
      .filter(e => differenceInDays(entry.timestamp, e.timestamp) < window)

    const avg = (lastEntries.length > 0 && idx < (window - 1))
      ? undefined
      : lastEntries.reduce((avg, e) => avg + e[field], 0) / lastEntries.length

    return { min, max, runningAverage: aggregates.runningAverage.concat([{ x: entry.timestamp, y: avg }]) }
  }, { min: null, max: null, runningAverage: [] })

  return (
    <CanvasJSChart options={ {
      title: title ? { text: title } : undefined,
      ...opts,
      axisY: {
        minimum: aggr.min - 15,
        maximum: aggr.max + 15,
      },
      data: [
        {
          type: 'spline',
          dataPoints: data
            .map(entry => ({
              x: entry.timestamp,
              y: entry[field],
            })),
        },
        {
          type: 'spline',
          dataPoints: aggr.runningAverage,
        },
      ],
    } }/>
  )
}

/**
 * @param {string} dateStr
 * @param {string} timeStr
 * @returns {Date}
 */
function combineDateAndTime(dateStr, timeStr) {
  const d = parseISO(dateStr)

  const [hours, minutes, seconds] = timeStr.split(':')
  d.setHours(+hours)
  d.setMinutes(+minutes)
  if (seconds) {
    d.setSeconds(...seconds.split('.').map(Number))
  } else {
    d.setSeconds(0)
  }
  return d
}
