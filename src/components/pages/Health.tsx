import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { axios } from '../../axios'
import { Icon } from '../icons'
import { preventDefault } from '../../util/component'
import { formatDate } from '../../util/formatters'
import { LoadDataForm } from '../health/LoadDataForm'
import { NewEntry, NewEntryForm } from '../health/NewEntryForm'
import '../health/styles.sass'
import { formatISO } from 'date-fns'

type State = {
  from: string | undefined,
  to: string | undefined,
  after: string | undefined,
  entries: {
    date: string,
    weight: number,
  }[],
}

export const Health: React.FunctionComponent = () => {
  const [state, setState] = useState<State>({
    from: undefined,
    to: undefined,
    after: undefined,
    entries: [],
  })
  const [newEntry, setNewEntry] = useState<NewEntry>({
    date: formatISO(new Date(), { representation: 'date' }),
    weight: '',
  })
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState<{ [key: string]: boolean }>({})
  const [error, setError] = useState<string | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const fetch = doAsync(setLoading, setError, async () => {
    setState(await fetchData({ from, to, after: state.after }))
    setInitialized(true)
  })

  const save = doAsync(setLoading, setError, async () => {
    await saveData({
      date: newEntry.date,
      weight: +newEntry.weight,
    })
    await fetch()
  })

  const remove = doAsync(setLoading, setError, async (date: string) => {
    setRemoving({
      ...removing,
      [date]: true,
    })
    await removeData(date)
    const nextRemoving = { ...removing }
    delete nextRemoving[date]
    setRemoving(nextRemoving)
    await fetch()
  })

  useEffect(() => {
    if (!initialized && !loading && !error) {
      fetch()
    }
  })

  return <>
    <h1>Health</h1>

    <LoadDataForm
      disabled={ loading }
      onSubmit={ preventDefault(fetch) }
      from={ from }
      setFrom={ setFrom }
      to={ to }
      setTo={ setTo }
    />

    <NewEntryForm
      disabled={ loading }
      onSubmit={ preventDefault(save) }
      entry={ newEntry }
      setValue={ setNewEntry }
    />

    { loading && <p>Een moment geduld, ik ben alles aan het ophalen ⏳.</p> }

    <section style={ { maxWidth: '100%', overflow: 'auto' } }>
      <table>
        <thead>
        <tr>
          <th>Datum</th>
          <th>Gewicht</th>
          <th>Acties</th>
        </tr>
        </thead>

        <tbody>
        { reverseMap(state.entries, entry => (
          <tr
            key={ entry.date }
            className={ classNames('health-table__row', {
              'health-table__row--removing': removing[entry.date],
            }) }
          >
            <td>{ formatDate(entry.date) }</td>
            <td>{ entry.weight }</td>
            <td>
              <Icon.Remove
                className="health-table__action health-table__action--remove"
                role="button"
                tabIndex={ 0 }
                title="Regel verwijderen"
                onClick={ preventDefault(() => remove(entry.date)) }
              />
            </td>
          </tr>
        )) }
        </tbody>
      </table>
    </section>
  </>
}
export default Health


function reverseMap<T, V>(items: T[], mapper: (item: T) => V): V[] {
  const result = []
  for (let i = items.length - 1; i >= 0; i -= 1) {
    result.push(mapper(items[i]))
  }
  return result
}

function doAsync(
  setLoading: (state: boolean) => void,
  setError: (state: string | null) => void,
  action: (...args: any[]) => Promise<void>,
): (...args: any[]) => Promise<void> {
  return async (...args) => {
    try {
      setLoading(true)
      setError(null)
      return await action(...args)
    } catch (err) {
      console.error(err)
      setError('Something went wrong...')
    } finally {
      setLoading(false)
    }
  }
}

type FetchDataOptionalParams = {
  from?: string,
  to?: string,
  after?: string,
}

async function fetchData({ from, to, after }: FetchDataOptionalParams): Promise<State> {
  const query = new URLSearchParams()
  if (from) query.append('from', from)
  if (to) query.append('to', to)
  if (after) query.append('after', after)

  const { data } = await axios.get(`/api/tracker?${ query.toString() }`)

  return {
    from: data.from,
    to: data.to,
    after: data.after,
    entries: data.entries,
  }
}

async function saveData(entry: { date: string, weight: number }): Promise<void> {
  await axios.post('/api/tracker', entry)
}

async function removeData(date: string): Promise<void> {
  await axios.delete(`/api/tracker/${ date }`)
}
