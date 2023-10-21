import FormGrid from './FormGrid.astro'
import FormGridField from './FormGridField.astro'
import FormGridActions from './FormGridActions.astro'

export default Object.assign(FormGrid, {
  Field: FormGridField,
  Actions: FormGridActions,
})
