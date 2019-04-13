import { animationFrameScheduler, combineLatest, interval } from 'rxjs'
import { map, scan, tap } from 'rxjs/operators'
import { CursorType, DataPoint, DrawData, FormulaType, GraphType } from './types'
import { CANVAS_WIDTH, CANVAS_X_BOUND, SCALING_FACTOR, ZERO } from './canvas/constants'
import { ctx as ctxIn } from './canvas/input'
import './canvas/output'
import './styles/main.sass'
import { draw, now } from './canvas/helpers'

class DataPointCollector {
  private readonly points: DataPoint[]
  private readonly boundary = CANVAS_X_BOUND / SCALING_FACTOR

  constructor(points: DataPoint[] = []) {
    this.points = points
  }

  concat([t, y]: DataPoint): DataPointCollector {
    const limit = now() - this.boundary
    const idx = this.points.findIndex(([t]) => t > limit)
    const result = (idx === -1 || idx === 0)
      ? [...this.points]
      : this.points.slice(idx - 1)

    result.push([t, y])

    return new DataPointCollector(result)
  }

  asArray(): DataPoint[] {
    return this.points
  }
}

const formula: FormulaType = time => .5 * Math.sin(time - 1) + .5 * Math.sin(3 * time - 2)

const interval$ = interval(0, animationFrameScheduler)
  .pipe(
    map(now),
  )

const data$ = interval$
  .pipe(
    map(evaluate(formula)),
    map(scale),
  )

const draw$ = combineLatest(
  data$
    .pipe(
      map(computeCursor),
    ),
  data$
    .pipe(
      scan((into: DataPointCollector, d: DataPoint) => into.concat(d), new DataPointCollector()),
      map(collector => collector.asArray()),
    ),
)
  .pipe(
    map(combineIntoDrawData),
    tap(draw(ctxIn)),
  )

draw$.subscribe()

function evaluate(formula: FormulaType): (t: number) => DataPoint {
  return t => [t, formula(t)]
}

function scale([t, y]: DataPoint): DataPoint {
  return [t, ZERO + y * SCALING_FACTOR]
}

function computeCursor([_, y]: DataPoint): CursorType {
  return [CANVAS_WIDTH + .5, y]
}

function combineIntoDrawData([cursor, graph]: [CursorType, GraphType]): DrawData {
  return {
    cursor,
    graph,
  }
}
