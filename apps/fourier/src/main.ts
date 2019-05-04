import { combineLatest, merge } from 'rxjs'
import { map, scan, tap } from 'rxjs/operators'
import { CursorType, DataPoint, DataPointCollector, DrawData, GraphType } from '@/types'
import { CANVAS_WIDTH } from '@/canvas/constants'
import canvasIn from '@/canvas/input'
import { draw } from '@/canvas/helpers'
import '@/canvas/output'
import '@/styles/main.sass'
import { data$, interval$ } from '@/streams'

const draw$ = combineLatest([
  data$
    .pipe(
      map(computeCursor),
    ),
  data$
    .pipe(
      scan((into: DataPointCollector, d: DataPoint) => into.concat(d), new DataPointCollector()),
      map(collector => collector.asArray()),
    ),
  interval$,
])
  .pipe(
    map(combineIntoDrawData),
    tap(draw(canvasIn.context)),
  )

merge(
  draw$,
).subscribe()

function computeCursor([_, y]: DataPoint): CursorType {
  return [CANVAS_WIDTH + .5, y]
}

function combineIntoDrawData([cursor, graph, now]: [CursorType, GraphType, number]): DrawData {
  return {
    cursor,
    graph,
    now,
  }
}
