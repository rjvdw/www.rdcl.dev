import React, { useState } from 'react'
import { useAutoFocusRef } from '../util'

export const DropRates = () => {
  const [dropRate, setDropRate] = useState(1)
  const [nrAttempts, setNrAttempts] = useState(100)
  const dropRateRef = useAutoFocusRef()

  return <>
    <h1>Drop Rate Calculator</h1>

    <rdcl-input-grid suffix>
      <label data-start={ 1 } htmlFor="dropRate">Drop rate</label>
      <input
        id="dropRate"
        ref={ dropRateRef }
        value={ dropRate }
        onChange={ event => setDropRate(event.target.value) }
        autoFocus
        type="number"
        inputMode="decimal"
        step="any"
      />
      <label htmlFor="dropRate">%</label>

      <label data-start={ 1 } htmlFor="nrAttempts">Nr. of attempts</label>
      <input
        id="nrAttempts"
        value={ nrAttempts }
        onChange={ event => setNrAttempts(event.target.value) }
      />

      <hr data-start={ 1 } data-span={ 2 }/>

      <label data-start={ 1 } htmlFor="chance">Chance</label>
      <input
        id="chance"
        readOnly
        type="number"
        step="any"
        value={ chance(+dropRate, +nrAttempts) }
      />
      <label htmlFor="chance">%</label>

      <label data-start={ 1 } htmlFor="perc95">95%</label>
      <input
        id="perc95"
        readOnly
        type="number"
        step="any"
        value={ percentile(+dropRate, 95) }
      />

      <label data-start={ 1 } htmlFor="perc99">99%</label>
      <input
        id="perc99"
        readOnly
        type="number"
        step="any"
        value={ percentile(+dropRate, 99) }
      />
    </rdcl-input-grid>
  </>
}

export default DropRates

function chance(dropRate, nrAttempts) {
  const p = dropRate / 100
  const n = Math.round(nrAttempts)

  if (n === 0) return 0

  const c = 100 - 100 * Math.pow(1 - p, n)
  return c.toFixed(2)
}

function percentile(droprate, percentile) {
  const p = droprate / 100
  return computePercentile(p, percentile / 100)

  function computePercentile(p, percentile) {
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

    return res
  }
}
