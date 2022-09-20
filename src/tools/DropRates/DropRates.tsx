import React, { useId } from 'react'
import { Title } from '../../components/Title'
import { useDropRates } from './DropRates.hooks'

export const DropRates = () => {
  const id = useId()
  const { form: { register }, chance, perc95, perc99 } = useDropRates()

  return <>
    <Title prefix="tools">drop rates</Title>
    <h1>Drop Rate Calculator</h1>

    <rdcl-input-grid suffix>
      <label data-start={ 1 } htmlFor={ `${ id }:dropRate` }>Drop rate</label>
      <input
        id={ `${ id }:dropRate` }
        data-testid="dropRate"
        autoFocus
        type="number"
        inputMode="decimal"
        step="any"
        { ...register('dropRate', {
          valueAsNumber: true,
        }) }
      />
      <label htmlFor={ `${ id }:dropRate` }>%</label>

      <label data-start={ 1 } htmlFor={ `${ id }:nrAttempts` }>Nr. of attempts</label>
      <input
        id={ `${ id }:nrAttempts` }
        data-testid="nrAttempts"
        { ...register('nrAttempts', {
          valueAsNumber: true,
        }) }
      />

      <hr data-start={ 1 } data-span={ 2 }/>

      <label data-start={ 1 } htmlFor={ `${ id }:chance` }>Chance</label>
      <input
        id={ `${ id }:chance` }
        data-testid="chance"
        readOnly
        type="number"
        step="any"
        value={ chance }
      />
      <label htmlFor={ `${ id }:chance` }>%</label>

      <label data-start={ 1 } htmlFor={ `${ id }:perc95` }>95%</label>
      <input
        id={ `${ id }:perc95` }
        data-testid="perc95"
        readOnly
        type="number"
        step="any"
        value={ perc95 }
      />

      <label data-start={ 1 } htmlFor={ `${ id }:perc99` }>99%</label>
      <input
        id={ `${ id }:perc99` }
        data-testid="perc99"
        readOnly
        type="number"
        step="any"
        value={ perc99 }
      />
    </rdcl-input-grid>
  </>
}

export default DropRates
