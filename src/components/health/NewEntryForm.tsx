import React, { FormEvent, useId } from 'react'

export type NewEntry = {
  date: string,
  weight: string,
}

type NewEntryFormProps = {
  disabled: boolean,
  entry: NewEntry,
  setValue: (entry: NewEntry) => void,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
}

export const NewEntryForm: React.FunctionComponent<NewEntryFormProps> = ({ disabled, entry, setValue, onSubmit }) => {
  const id = useId()

  return (
    <section>
      <h2>Voer nieuwe regel in</h2>
      <form onSubmit={ onSubmit }>
        <rdcl-input-grid>
          <label htmlFor={ `${ id }:health-new-date` }>Datum</label>
          <input
            id={ `${ id }:health-new-date` }
            type="date"
            value={ entry.date }
            onChange={ event => setValue({
              ...entry,
              date: event.target.value,
            }) }
            required
            disabled={ disabled }
          />

          <label htmlFor={ `${ id }:health-new-weight` }>Gewicht</label>
          <input
            id={ `${ id }:health-new-weight` }
            type="number"
            inputMode="decimal"
            step={ .1 }
            value={ entry.weight }
            onChange={ event => setValue({
              ...entry,
              weight: event.target.value,
            }) }
            required
            disabled={ disabled }
          />

          <button data-start={ 2 } disabled={ disabled }>Sla op</button>
        </rdcl-input-grid>
      </form>
    </section>
  )
}
