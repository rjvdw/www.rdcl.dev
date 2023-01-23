import React, { FunctionComponent } from 'react'
import { useDeleteRecord } from './hooks'
import { HealthRecord } from './types'

type HealthRecordsProps = {
  records: HealthRecord[]
  loading: boolean
  error?: string
  refresh(): void
}

export const HealthRecords: FunctionComponent<HealthRecordsProps> = ({
  records,
  loading,
  error,
  refresh,
}) => {
  const deleteRecord = useDeleteRecord(refresh)

  if (loading) {
    return <p>Loading health records...</p>
  }

  if (error) {
    return (
      <p className="error-message">Failed to load health records: {error}</p>
    )
  }

  if (records.length === 0) {
    return <p>No records yet.</p>
  }

  return (
    <div className="responsive-table-wrapper health__overview">
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
    </div>
  )
}
