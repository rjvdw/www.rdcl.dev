import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { isValid } from '../util/number'

export type DropRatesForm = {
  dropRate?: number
  nrAttempts?: number
}

type DropRatesState = {
  chance: string
  perc95: string
  perc99: string
}

const INITIAL_STATE: DropRatesState = {
  chance: '',
  perc95: '',
  perc99: '',
}

export const useDropRates = () => {
  const form = useForm<DropRatesForm>()
  const [state, setState] = useState<DropRatesState>(INITIAL_STATE)

  const [dropRate, nrAttempts] = form.watch(['dropRate', 'nrAttempts'])

  useEffect(() => {
    const newState = { ...INITIAL_STATE }

    if (isValid(dropRate)) {
      newState.perc95 = computePercentile(dropRate, 95)
      newState.perc99 = computePercentile(dropRate, 99)

      if (isValid(nrAttempts)) {
        newState.chance = computeChance(dropRate, nrAttempts)
      }
    }

    setState(newState)
  }, [dropRate, nrAttempts])

  return {
    form,
    ...state,
  }
}

function computeChance(dropRate: number, nrAttempts: number): string {
  const p = dropRate / 100
  const n = Math.round(nrAttempts)

  if (n === 0) return '0'

  const c = 100 - 100 * Math.pow(1 - p, n)
  return c.toFixed(2)
}

function computePercentile(dropRate: number, percentile: number): string {
  const p = dropRate / 100
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
