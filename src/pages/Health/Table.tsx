import React, { FunctionComponent } from 'react'
import { computeBmi } from '../../tools/Bmi'
import { HealthRecord, HealthSettings } from './types'

type TableProps = {
  settings?: HealthSettings
  records: HealthRecord[]
  deleteRecord(record: HealthRecord): void
}

export const Table: FunctionComponent<TableProps> = ({
  settings,
  records,
  deleteRecord,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
          <th>Body Fat %</th>
          {settings?.height ? <th>BMI</th> : null}
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
            {settings?.height ? (
              <td>
                {record.data.weight
                  ? computeBmi(settings.height, record.data.weight).toFixed(1)
                  : ''}
              </td>
            ) : null}
            <td>
              <button onClick={() => deleteRecord(record)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
