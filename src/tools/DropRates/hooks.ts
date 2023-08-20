import { useReducer } from 'preact/compat'
import { useMemo } from 'preact/hooks'
import { convert } from '../../util/form'
import { computeChance, computePercentile } from './compute'
import { Action, reducer, State } from './state'

type DropRatesReturn = {
  onChange(this: void, event: Event): void
  chance: string
  perc95: string
  perc99: string
}

export function useDropRates(): DropRatesReturn {
  const [state, dispatch] = useReducer(reducer, {})

  const chance = useMemo(() => {
    if (state.dropRate === undefined || state.nrAttempts === undefined) {
      return ''
    }
    return computeChance(state.dropRate, state.nrAttempts).toFixed(2)
  }, [state])

  const perc95 = usePercentile(state, 95)
  const perc99 = usePercentile(state, 99)

  return {
    onChange(event) {
      if (event.target instanceof HTMLInputElement) {
        const action = getAction(event.target)
        if (action) {
          dispatch(action)
        }
      }
    },
    chance,
    perc95,
    perc99,
  }
}

function usePercentile(state: State, percentile: number) {
  return useMemo(() => {
    if (state.dropRate === undefined) {
      return ''
    }

    if (state.dropRate <= 0) {
      return '∞'
    }

    return computePercentile(state.dropRate, percentile).toString()
  }, [state])
}

function getAction(field: HTMLInputElement): Action | undefined {
  switch (field.name) {
    case 'drop-rate':
      return {
        type: 'set-drop-rate',
        value: convert.number(field.value),
      }
    case 'nr-attempts':
      return {
        type: 'set-nr-attempts',
        value: convert.number(field.value),
      }
    default:
      return undefined
  }
}
