import { useFormId } from '../../util/form'
import { today } from './dateUtil'

type NewEntryFormProps = {
  onSubmit(this: void, event: Event): void
}

export const NewEntryForm = ({ onSubmit }: NewEntryFormProps) => {
  const id = useFormId()

  return (
    <form onSubmit={onSubmit}>
      <section class="form-grid" data-suffix={true}>
        <label for={id('date')}>Date</label>
        <input
          id={id('date')}
          name="date"
          type="date"
          required
          defaultValue={today()}
        />

        <label data-start={1} for={id('weight')}>
          Weight
        </label>
        <input
          id={id('weight')}
          name="weight"
          type="number"
          step={0.1}
          min={0}
        />
        <label for={id('weight')}>kg</label>

        <label data-start={1} for={id('body-fat')}>
          Body Fat
        </label>
        <input
          id={id('body-fat')}
          name="body-fat"
          type="number"
          step={0.1}
          min={0}
          max={100}
        />
        <label for={id('body-fat')}>%</label>

        <button data-start={2}>Save</button>
      </section>
    </form>
  )
}
