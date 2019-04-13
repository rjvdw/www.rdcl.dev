import { map } from 'rxjs/operators'
import { DataPoint, FormulaType } from '@/types'
import interval$ from '@/streams/interval'
import { SCALING_FACTOR, ZERO } from '@/canvas/constants'

const formula: FormulaType = time => .5 * Math.sin(time - 1) + .5 * Math.sin(3 * time - 2)

const data$ = interval$
  .pipe(
    map(evaluate(formula)),
    map(scale),
  )

export default data$

function evaluate(formula: FormulaType): (t: number) => DataPoint {
  return t => [t, formula(t)]
}

function scale([t, y]: DataPoint): DataPoint {
  return [t, ZERO + y * SCALING_FACTOR]
}
