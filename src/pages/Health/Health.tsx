import React from 'react'
import { ActiveRoute } from '../../components/ActiveRoute'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'
import { useHistoryState } from '../../util/useHistoryState'
import { FromAndTo, SearchState } from './FromAndTo'
import { HealthRecords } from './HealthRecords'
import { NewEntry } from './NewEntry'
import { useHealthRecords } from './hooks'

export const Health = () => {
  const [{ from, to }, setSearch] = useHistoryState<SearchState>({})
  const { records, loading, error, refresh } = useHealthRecords(from, to)

  return (
    <>
      <RequireLogin />
      <Title>health</Title>
      <ActiveRoute>health</ActiveRoute>
      <h1>Health</h1>

      <NewEntry onSave={refresh} />

      <h2>Records</h2>

      <FromAndTo from={from} to={to} setSearch={setSearch} />

      <HealthRecords
        records={records}
        loading={loading}
        error={error}
        refresh={refresh}
      />
    </>
  )
}
