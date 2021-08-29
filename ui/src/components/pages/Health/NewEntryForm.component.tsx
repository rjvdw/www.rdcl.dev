import React, { FormEvent } from 'react'
import { numericInput } from './helpers'

type NewEntryFormProps = {
  disabled: boolean,
  entry: {
    date: string,
    weight: string,
  },
  setValue: (key: string, value: string | number) => void,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
}

export const NewEntryForm: React.FunctionComponent<NewEntryFormProps> = ({ disabled, entry, setValue, onSubmit }) => (
  <section>
    <h2>Voer nieuwe regel in</h2>
    <form onSubmit={ onSubmit }>
      <rdcl-input-grid>
        <label htmlFor="health-new-date">Datum</label>
        <input
          id="health-new-date"
          type="date"
          value={ entry.date }
          onChange={ event => setValue('date', event.target.value) }
          required
          disabled={ disabled }
        />

        <label htmlFor="health-new-weight">Gewicht</label>
        <input
          id="health-new-weight"
          type="number"
          inputMode="decimal"
          step={ .1 }
          value={ entry.weight }
          onChange={ event => setValue('weight', numericInput(event.target.value)) }
          required
          disabled={ disabled }
        />

        <button data-start={ 2 } disabled={ disabled }>Sla op</button>
      </rdcl-input-grid>
    </form>
  </section>
)
