import React, { FormEvent } from 'react'

type LoadDataFormProps = {
  disabled: boolean,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  from: string,
  setFrom: (value: string) => void,
  to: string,
  setTo: (value: string) => void,
}

export const LoadDataForm: React.FunctionComponent<LoadDataFormProps> = ({ disabled, onSubmit, from, setFrom, to, setTo }) => (
  <section>
    <h2>Haal data op</h2>
    <form onSubmit={ onSubmit }>
      <rdcl-input-grid>
        <label htmlFor="health-range-from">Van</label>
        <input
          id="health-range-from"
          type="date"
          value={ from }
          onChange={ event => setFrom(event.target.value) }
        />

        <label htmlFor="health-range-to">Tot</label>
        <input
          id="health-range-to"
          type="date"
          value={ to }
          onChange={ event => setTo(event.target.value) }
        />

        <button data-start={ 2 } disabled={ disabled }>Haal op</button>
      </rdcl-input-grid>
    </form>
  </section>
)
