import HealthRecordForm from './HealthRecordForm.astro'
import HealthRecords from './HealthRecords.astro'
import HealthSearch from './HealthSearch.astro'
import HealthSettings from './HealthSettings.astro'

export default Object.assign(
  {},
  {
    RecordForm: HealthRecordForm,
    Records: HealthRecords,
    Search: HealthSearch,
    Settings: HealthSettings,
  },
)
