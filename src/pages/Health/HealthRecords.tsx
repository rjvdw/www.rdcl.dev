import React, { FunctionComponent, useState } from 'react'
import { Error } from '../../components/Error'
import { Graph } from './Graph'
import { Table } from './Table'
import { useDeleteRecord } from './hooks'
import { HealthRecord, HealthSettings } from './types'

type HealthRecordsProps = {
  settings?: HealthSettings
  records: HealthRecord[]
  count?: number
  loading: boolean
  errors: string[]
  refresh(): void
  loadMore(): void
}

export const HealthRecords: FunctionComponent<HealthRecordsProps> = ({
  settings,
  records,
  count,
  loading,
  errors,
  refresh,
  loadMore,
}) => {
  const deleteRecord = useDeleteRecord(refresh)
  const [mode, setMode] = useState<'table' | 'graph'>('table')

  if (loading) {
    return <p>Loading health records...</p>
  }

  if (errors.length > 0) {
    return <Error errors={errors}>Failed to load health records</Error>
  }

  if (!count) {
    return (
      <div className="responsive-table-wrapper health__overview">
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
    </div>
  )
}
