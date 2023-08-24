import { useFormId } from '../../util/form'
import { HealthSettings } from './state'

type SettingsFormProps = {
  onSubmit(this: void, event: Event): void
  settings: HealthSettings
}

export const SettingsForm = ({
  onSubmit,
  settings: { height },
}: SettingsFormProps) => {
  const id = useFormId()

  return (
    <details>
      <summary>Health settings</summary>

      <form onSubmit={onSubmit}>
        <section class="form-grid" data-suffix={true}>
          <label data-start={1} htmlFor={id('height')}>
            Height
          </label>
          <input
            id={id('height')}
            name="height"
            type="number"
            inputMode="decimal"
            step={0.1}
            min={0}
            defaultValue={height ? String(height) : ''}
          />
          <label htmlFor={id('height')}>cm</label>

          <button data-start={2}>Save</button>
        </section>
      </form>
    </details>
  )
}
