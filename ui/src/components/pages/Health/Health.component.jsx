import React, { useState } from 'react'
import { axios } from '../../../axios'
import { formatDate } from '../../../util/formatters'
import { preventDefault } from '../../../util/component'

export const Health = () => {
  const [data, setData] = useState([])
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

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

  if (!initialized && !loading) {
    fetch()
  }

  return <>
    <h1>Health</h1>

    { error && <p>Hm... Het lijkt er op dat er iets mis is gegaan 🤔: { error }</p> }

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

    { loading && <p>Een moment geduld, ik ben alles aan het ophalen ⏳.</p> }

    { initialized && <>
      <hr/>
      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
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
