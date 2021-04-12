import React, { Suspense } from 'react'
import classNames from 'classnames'
import { history } from '../../../history'
import { addDays, formatISO, parseISO, subDays } from 'date-fns'
import { formatDate } from '../../../util/formatters'
import { preventDefault } from '../../../util/component'
import { useHistoryState } from '../../util'
import { Icon } from './icons'
import './Health.styles.sass'

const CanvasJSChart = React.lazy(() => import('./CanvasJS'))

export class Health extends React.Component {

  constructor(...args) {
    super(...args)
    const historyState = history.location.state || {}
    this.state = {
      from: historyState.from || '',
      to: historyState.to || '',
      newEntry: {
        date: formatISO(new Date(), { representation: 'date' }),
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
    const { from, to } = this.state

    await this.props.load(
      from || undefined,
      to || undefined,
    )
  }

  async save() {
    await this.props.save(this.state.newEntry)
    await this.load()
  }

  async remove(entry) {
    await this.props.remove(entry.key)
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
    const { newEntry, from, to } = this.state
    const { data, graphData, actualFrom, actualTo, errors, loading, saving, removing, clearErrors } = this.props

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
        <Chart title="Gewicht" graphData={ graphData } from={ actualFrom } to={ actualTo }/>
        <hr/>
        <HealthTable data={ data } removeEntry={ entry => this.remove(entry) } removing={ removing }/>
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
        <label htmlFor="health-range-from">Van</label>
        <input
          id="health-range-from"
          type="date"
          value={ from }
          onChange={ event => setFrom(event.target.value) }
        />

        <label htmlFor="health-range-to">Tot</label>
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
        <input
          id="health-new-date"
          type="date"
          value={ entry.date }
          onChange={ event => setValue('date', event.target.value) }
          required
          disabled={ disabled }
        />

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

const HealthTable = ({ removeEntry, removing, data }) => (
  <section style={ { maxWidth: '100%', overflow: 'auto' } }>
    <table>
      <thead>
      <tr>
        <th>Datum</th>
        <th>Gewicht</th>
        <th>Gemiddeld</th>
        <th>Acties</th>
      </tr>
      </thead>
      <tbody>
      { data.map(entry => (
        <tr
          key={ entry.key }
          className={ classNames('health-table__row', {
            'health-table__row--removing': removing[entry.key],
          }) }
        >
          <td>{ formatDate(entry.date) }</td>
          <td data-numeric>{ formatNumber(entry.weight) }</td>
          <td data-numeric>{ formatNumber(entry.averageWeight) }</td>
          <td>
            <Icon.Remove
              className="health-table__action health-table__action--remove"
              role="button"
              tabIndex={ 0 }
              title="Regel verwijderen"
              onClick={ preventDefault(() => removeEntry(entry)) }
            />
          </td>
        </tr>
      )) }
      </tbody>
    </table>
  </section>
)

const Chart = ({ from, to, graphData, title, ...opts }) => {
  const [{ showData, showAverage }, setOptions] = useHistoryState('chartOptions', {
    showData: true,
    showAverage: true,
  })

  const onShowDataChanged = event => {
    setOptions({
      showData: event.target.checked,
      showAverage: true,
    })
  }

  const onShowAverageChanged = event => {
    setOptions({
      showData: true,
      showAverage: event.target.checked,
    })
  }

  return (
    <section>
      <Suspense fallback={ <rdcl-spinner/> }>
        <CanvasJSChart options={ {
          title: title ? { text: title } : undefined,
          ...opts,
          axisX: {
            minimum: subDays(parseISO(from), 1),
            maximum: addDays(parseISO(to), 1),
          },
          axisY: {
            minimum: graphData.min - 15,
            maximum: graphData.max + 15,
          },
          data: [
            showData && {
              type: 'spline',
              dataPoints: graphData.dataPoints,
              color: '#4f81bc',
            },
            showAverage && {
              type: 'spline',
              dataPoints: graphData.runningAverage,
              color: '#c0504e',
            },
          ].filter(d => d),
        } }/>
      </Suspense>

      <div className="health-graph__options-container">
        <label className="health-graph__option">
          <input
            className="health-graph__option-checkbox"
            type="checkbox"
            checked={ showData }
            onChange={ onShowDataChanged }
          />
          Toon data
        </label>

        <label className="health-graph__option">
          <input
            className="health-graph__option-checkbox"
            type="checkbox"
            checked={ showAverage }
            onChange={ onShowAverageChanged }
          />
          Toon gemiddelde
        </label>
      </div>
    </section>
  )
}

function numericInput(value) {
  if (value === '') return ''
  return +value
}

function formatNumber(number, fractionDigits = 1) {
  if (number === null || number === undefined) return ''
  return number.toFixed(fractionDigits)
}
