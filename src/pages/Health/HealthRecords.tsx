import React, { FunctionComponent, useState } from 'react'
import { Graph } from './Graph'
import { Table } from './Table'
import { useDeleteRecord } from './hooks'
import { HealthRecord, HealthSettings } from './types'

type HealthRecordsProps = {
  settings?: HealthSettings
  records: HealthRecord[]
  count?: number
  loading: boolean
  error?: string
  refresh(): void
  loadMore(): void
}

export const HealthRecords: FunctionComponent<HealthRecordsProps> = ({
  settings,
  records,
  count,
  loading,
  error,
  refresh,
  loadMore,
}) => {
  const deleteRecord = useDeleteRecord(refresh)
  const [mode, setMode] = useState<'table' | 'graph'>('table')

  if (error) {
    return (
      <p className="error-message">Failed to load health records: {error}</p>
    )
  }

  if (!count) {
    if (loading) {
      return <p>Loading health records...</p>
    }

    return (
      <div className="responsive-table-wrapper health__overview">
        <Error error={error} />
        <p>No records yet.</p>
      </div>
    )
  }

  return (
    <div className="responsive-table-wrapper health__overview">
      <p>
        Showing {records.length} out of {count} matching records.{' '}
        {mode === 'table' && (
          <button className="link" onClick={() => setMode('graph')}>
            Switch to graph view.
          </button>
        )}
        {mode === 'graph' && (
          <button className="link" onClick={() => setMode('table')}>
            Switch to table view.
          </button>
        )}
      </p>

      {mode === 'table' && (
        <Table
          settings={settings}
          records={records}
          deleteRecord={deleteRecord}
        />
      )}

      {mode === 'graph' && <Graph settings={settings} records={records} />}

      {records.length < count && (
        <button disabled={loading} onClick={loadMore}>
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}

      <Error error={error} />
    </div>
  )
}

const Error: FunctionComponent<{ error?: string }> = ({ error }) =>
  error ? (
    <p className="error-message">Failed to load health records: {error}</p>
  ) : null
