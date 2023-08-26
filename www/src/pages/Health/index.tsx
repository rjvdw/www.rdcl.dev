import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { LoginRequired } from '../../components/LoginRequired'
import { PageTitle } from '../../components/PageTitle'
import { fmt } from '../../util/format'
import { NewEntryForm } from './NewEntryForm'
import { SearchForm } from './SearchForm'
import { SettingsForm } from './SettingsForm'
import { HealthRecord, HealthSettings } from './state'
import { useFormHandlers } from './useFormHandlers'
import { useHealthData } from './useHealthData'
import './styles.scss'

export const Health: FunctionComponent = () => {
  const {
    triggerReloadHealthData,
    triggerReloadSettings,
    from,
    to,
    saveNewEntry,
    saveSettings,
    performSearch,
    deleteRecord,
  } = useFormHandlers()
  const { loading, count, records, settings } = useHealthData(
    triggerReloadHealthData,
    triggerReloadSettings,
    from,
    to,
  )

  return (
    <>
      <LoginRequired />
      <ActiveRoute>health</ActiveRoute>
      <PageTitle>health</PageTitle>

      <h1>Health</h1>

      <NewEntryForm onSubmit={saveNewEntry.onSubmit} />

      <h2>Settings</h2>
      <SettingsForm onSubmit={saveSettings.onSubmit} settings={settings} />

      <h2>Records</h2>
      <SearchForm onSubmit={performSearch.onSubmit} from={from} to={to} />

      {loading && <p>Fetching the data...</p>}

      {records.length > 0 && (
        <>
          <p>
            Showing {records.length} out of {count} matching records.
          </p>

          <Table settings={settings}>
            {records.map((record) => (
              <Record
                key={record.date}
                record={record}
                settings={settings}
                deleteRecord={deleteRecord(record)}
              />
            ))}
          </Table>
        </>
      )}
    </>
  )
}

type TableProps = {
  settings: HealthSettings
}

const Table: FunctionComponent<TableProps> = ({ children, settings }) => (
  <div class="responsive-table-wrapper health-records">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
          <th colSpan={2}>Body Fat</th>
          {settings.height ? <th>BMI</th> : null}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)

type RecordProps = {
  record: HealthRecord
  settings: HealthSettings
  deleteRecord(this: void, event: Event): void
}

const Record = ({ record, settings, deleteRecord }: RecordProps) => (
  <tr>
    <td>{fmt.date(record.date)}</td>
    <td>{record.data.weight ? `${fmt.number(record.data.weight)}kg` : ''}</td>
    <td>{record.data.bodyFat ? `${fmt.number(record.data.bodyFat)}%` : ''}</td>
    <td>
      {record.data.weight && record.data.bodyFat
        ? `${fmt.number(
            computeBodyFatWeight(record.data.weight, record.data.bodyFat),
          )}kg`
        : ''}
    </td>
    {settings?.height ? (
      <td>
        {record.data.weight
          ? fmt.number(computeBmi(settings.height, record.data.weight))
          : ''}
      </td>
    ) : null}
    <td>
      <button onClick={deleteRecord}>Delete</button>
    </td>
  </tr>
)

function computeBodyFatWeight(weight: number, bodyFat: number): number {
  return (weight * bodyFat) / 100
}

export function computeBmi(height: number, weight: number): number {
  return weight / correctedHeight(height)
}

function correctedHeight(height: number): number {
  return (height / 100) ** 2
}
