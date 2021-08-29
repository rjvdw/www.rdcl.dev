import React from 'react'
import { history } from '../../../history'
import { formatISO } from 'date-fns'
import { preventDefault } from '../../../util/component'
import './Health.styles.sass'
import { Aggregates, HealthData, StateError } from '../../../modules/health'
import { ErrorMessage } from './ErrorMessage.component'
import { LoadDataForm } from './LoadDataForm.component'
import { NewEntryForm } from './NewEntryForm.component'
import { HealthTable } from './HealthTable.component'
import { Chart } from './Chart.component'

export type DataEntry = {
  key: string,
  date: Date,
  data: HealthData,
}

type HealthProps = {
  loading: boolean,
  saving: boolean,
  removing: { [date: string]: true },
  data: DataEntry[],
  graphData: Aggregates,
  actualFrom: string | null,
  actualTo: string | null,
  errors: StateError[],

  clearErrors: () => void,
  load: (from?: string, to?: string) => void,
  unload: () => void,
  save: (entry: HealthData) => void,
  remove: (key: string) => void,
}
type HealthState = {
  from: string,
  to: string,
  newEntry: {
    date: string,
    weight: string,
  },
}

export class Health extends React.Component<HealthProps, HealthState> {

  constructor(props: HealthProps) {
    super(props)
    const historyState = (history.location.state || {}) as { from?: string, to?: string }
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

  async remove(entry: HealthData) {
    await this.props.remove(entry.key)
    await this.load()
  }

  setFrom(from: string) {
    this.setState({ from })
    // @ts-ignore
    history.replace(undefined, { ...history.location.state, from })
  }

  setTo(to: string) {
    this.setState({ to })
    // @ts-ignore
    history.replace(undefined, { ...history.location.state, to })
  }

  setNewEntryValue(key: string, value: string | number) {
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
        <Chart title="Gewicht" graphData={ graphData } from={ actualFrom! } to={ actualTo! }/>
        <hr/>
        <HealthTable data={ data } removeEntry={ entry => this.remove(entry) } removing={ removing }/>
      </> }
    </>
  }
}
