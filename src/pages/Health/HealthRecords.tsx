import React, { FunctionComponent } from 'react'
import { useDeleteRecord } from './hooks'
import { HealthRecord } from './types'

type HealthRecordsProps = {
  records: HealthRecord[]
  count?: number
  loading: boolean
  error?: string
  refresh(): void
  loadMore(): void
}

export const HealthRecords: FunctionComponent<HealthRecordsProps> = ({
  records,
  count,
  loading,
  error,
  refresh,
  loadMore,
}) => {
  const deleteRecord = useDeleteRecord(refresh)

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
        Showing {records.length} out of {count} matching records.
      </p>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Body Fat %</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.date}>
              <td>{record.date}</td>
              <td>
                {record.data.weight
                  ? `${record.data.weight?.toLocaleString()}kg`
                  : ''}
              </td>
              <td>
                {record.data.bodyFat
                  ? `${record.data.bodyFat.toLocaleString()}%`
                  : ''}
              </td>
              <td>
                <button onClick={() => deleteRecord(record)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
