import React from 'react'
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react'
import { history } from '../../../history'
import { differenceInDays, format, formatISO, parseISO } from 'date-fns'
import { formatDate } from '../../../util/formatters'
import { preventDefault } from '../../../util/component'
import { setTitle } from '../../util'

const { CanvasJS, CanvasJSChart } = CanvasJSReact

export class Health extends React.Component {

  constructor(...args) {
    super(...args)
    const historyState = history.location.state || {}
    this.state = {
      from: historyState.from || '',
      to: historyState.to || '',
      newEntry: {
        date: formatISO(new Date(), { representation: 'date' }),
        time: format(new Date(), 'HH:mm'),
        weight: '',
      },
    }
  }

  componentDidMount() {
    this.load()
  }

  componentWillUnmount() {
    this.props.unload()
  }

  async load() {
    await this.props.load(this.state.from || undefined, this.state.to || undefined)
  }

  async save() {
    await this.props.save(this.state.newEntry)
    await this.load()
  }

  setFrom(from) {
    this.setState({ from })
    history.replace(undefined, { ...history.location.state, from })
  }

  setTo(to) {
    this.setState({ to })
    history.replace(undefined, { ...history.location.state, to })
  }

  setNewEntryValue(key, value) {
    this.setState(state => ({
      newEntry: {
        ...state.newEntry,
        [key]: value,
      },
    }))
  }

  render() {
    setTitle('health')

    const { newEntry, from, to } = this.state
    const { data, errors, loading, saving, clearErrors } = this.props

    return <>
      <h1>Health</h1>

      <ErrorMessage errors={ errors } clearErrors={ clearErrors }/>

      <LoadDataForm
        disabled={ loading }
        onSubmit={ preventDefault(() => this.load()) }
        from={ from } setFrom={ from => this.setFrom(from) }
        to={ to } setTo={ to => this.setTo(to) }
      />

      <NewEntryForm
        disabled={ saving }
        onSubmit={ preventDefault(() => this.save()) }
        entry={ newEntry }
        setValue={ (key, value) => this.setNewEntryValue(key, value) }
      />

      { loading && <p>Een moment geduld, ik ben alles aan het ophalen ⏳.</p> }

      { data.length > 0 && <>
        <hr/>
        <Chart title="Gewicht" field="weight" data={ data }/>
        <hr/>
        <HealthTable data={ data }/>
      </> }
    </>
  }
}

const ErrorMessage = ({ errors, clearErrors }) => errors.length > 0 ? (
  <section>
    <p>Hm... Het lijkt er op dat er iets mis is gegaan 🤔</p>
    <ul>
      { errors.map(err => <li key={ err.key }>{ err.message }</li>) }
    </ul>
    <button onClick={ clearErrors }>Maak leeg</button>
  </section>
) : ''

const LoadDataForm = ({ disabled, onSubmit, from, setFrom, to, setTo }) => (
  <section>
    <h2>Haal data op</h2>
    <form onSubmit={ onSubmit }>
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

        <button data-start={ 2 } disabled={ disabled }>Haal op</button>
      </rdcl-input-grid>
    </form>
  </section>
)

const NewEntryForm = ({ disabled, entry, setValue, onSubmit }) => (
  <section>
    <h2>Voer nieuwe regel in</h2>
    <form onSubmit={ onSubmit }>
      <rdcl-input-grid>
        <label htmlFor="health-new-date">Datum</label>
        <rdcl-combi-input mode="balanced">
          <input
            id="health-new-date"
            type="date"
            value={ entry.date }
            onChange={ event => setValue('date', event.target.value) }
            required
            disabled={ disabled }
          />
          <input
            id="health-new-time"
            type="time"
            value={ entry.time }
            onChange={ event => setValue('time', event.target.value) }
            required
            disabled={ disabled }
          />
        </rdcl-combi-input>

        <label htmlFor="health-new-weight">Gewicht</label>
        <input
          id="health-new-weight"
          type="number"
          inputMode="decimal"
          step={ .1 }
          value={ entry.weight }
          onChange={ event => setValue('weight', numericInput(event.target.value)) }
          required
          disabled={ disabled }
        />

        <button data-start={ 2 } disabled={ disabled }>Sla op</button>
      </rdcl-input-grid>
    </form>
  </section>
)

const HealthTable = ({ data }) => (
  <section>
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
  </section>
)

const Chart = ({ data, field, window = 7, title, ...opts }) => {
  let lastEntries = []
  const aggr = data.reduce((aggregates, entry, idx) => {
    const min = aggregates.min === null ? entry[field] : Math.min(aggregates.min, entry[field])
    const max = aggregates.max === null ? entry[field] : Math.max(aggregates.max, entry[field])

    lastEntries = [entry].concat(lastEntries)
      .filter(e => differenceInDays(parseISO(entry.timestamp), parseISO(e.timestamp)) < window)

    const avg = (lastEntries.length > 0 && idx < (window - 1))
      ? undefined
      : lastEntries.reduce((avg, e) => avg + e[field], 0) / lastEntries.length

    return { min, max, runningAverage: aggregates.runningAverage.concat([{ x: parseISO(entry.timestamp), y: avg }]) }
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
              x: parseISO(entry.timestamp),
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

function numericInput(value) {
  if (value === '') return ''
  return +value
}
