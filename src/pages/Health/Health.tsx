import React from 'react'
import { ActiveRoute } from '../../components/ActiveRoute'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'
import { useHistoryState } from '../../util/useHistoryState'
import { FromAndTo, SearchState } from './FromAndTo'
import { HealthRecords } from './HealthRecords'
import { HealthSettings } from './HealthSettings'
import { NewEntry } from './NewEntry'
import { useHealthRecords, useHealthSettings } from './hooks'

export const Health = () => {
  const [{ from, to }, setSearch] = useHistoryState<SearchState>({})
  const {
    settings,
    loading: loadingHealthSettings,
    error: errorLoadingHealthSettings,
    refresh: refreshHealthSettings,
  } = useHealthSettings()
  const { records, count, loading, error, refresh, loadMore } =
    useHealthRecords(from, to)

  return (
    <>
      <RequireLogin />
      <Title>health</Title>
      <ActiveRoute>health</ActiveRoute>
      <h1>Health</h1>

      <NewEntry onSave={refresh} />

      <h2>Settings</h2>

      <HealthSettings settings={settings} refresh={refreshHealthSettings} />

      <h2>Records</h2>

      <FromAndTo from={from} to={to} setSearch={setSearch} />

      <HealthRecords
        settings={settings}
        records={records}
        count={count}
        loading={loading || loadingHealthSettings}
        error={error || errorLoadingHealthSettings}
        refresh={refresh}
        loadMore={loadMore}
      />
    </>
  )
}
