import React, { ChangeEvent, useId, useState } from 'react'
import { useAutoFocusRef } from '../../util/hooks'

export const DropRates = () => {
  const id = useId()
  const [dropRate, setDropRate] = useState<number | string>(1)
  const [nrAttempts, setNrAttempts] = useState<number | string>(100)
  const dropRateRef = useAutoFocusRef<HTMLInputElement>()

  return <>
    <h1>Drop Rate Calculator</h1>

    <rdcl-input-grid suffix>
      <label data-start={ 1 } htmlFor={ `${ id }:dropRate` }>Drop rate</label>
      <input
        id={ `${ id }:dropRate` }
        data-testid="dropRate"
        ref={ dropRateRef }
        value={ dropRate }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => setDropRate(event.target.value) }
        autoFocus
        type="number"
        inputMode="decimal"
        step="any"
      />
      <label htmlFor={ `${ id }:dropRate` }>%</label>

      <label data-start={ 1 } htmlFor={ `${ id }:nrAttempts` }>Nr. of attempts</label>
      <input
        id={ `${ id }:nrAttempts` }
        data-testid="nrAttempts"
        value={ nrAttempts }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => setNrAttempts(event.target.value) }
      />

      <hr data-start={ 1 } data-span={ 2 }/>

      <label data-start={ 1 } htmlFor={ `${ id }:chance` }>Chance</label>
      <input
        id={ `${ id }:chance` }
        data-testid="chance"
        readOnly
        type="number"
        step="any"
        value={ chance(+dropRate, +nrAttempts) }
      />
      <label htmlFor={ `${ id }:chance` }>%</label>

      <label data-start={ 1 } htmlFor={ `${ id }:perc95` }>95%</label>
      <input
        id={ `${ id }:perc95` }
        data-testid="perc95"
        readOnly
        type="number"
        step="any"
        value={ percentile(+dropRate, 95) }
      />

      <label data-start={ 1 } htmlFor={ `${ id }:perc99` }>99%</label>
      <input
        id={ `${ id }:perc99` }
        data-testid="perc99"
        readOnly
        type="number"
        step="any"
        value={ percentile(+dropRate, 99) }
      />
    </rdcl-input-grid>
  </>
}

export default DropRates

function chance(dropRate: number, nrAttempts: number): string {
  const p = dropRate / 100
  const n = Math.round(nrAttempts)

  if (n === 0) return '0'

  const c = 100 - 100 * Math.pow(1 - p, n)
  return c.toFixed(2)
}

function percentile(droprate: number, percentile: number): string {
  const p = droprate / 100
  return computePercentile(p, percentile / 100)

  function computePercentile(p: number, percentile: number): string {
    if (p === 0) return '∞'

    let lower = 0
    let upper = Number.MAX_SAFE_INTEGER
    let res

    do {
      res = Math.floor((lower + upper) / 2)
      if (1 - Math.pow(1 - p, res) < percentile) {
        lower = res
      } else {
        upper = res
      }
    } while (lower < upper - 1)

    return res.toString()
  }
}
