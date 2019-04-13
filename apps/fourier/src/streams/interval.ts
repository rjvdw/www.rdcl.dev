import { animationFrameScheduler, combineLatest, interval } from 'rxjs'
import { first, map } from 'rxjs/operators'

const ani$ = interval(0, animationFrameScheduler)
  .pipe(
    map(() => animationFrameScheduler.now() / 1000),
  )

const interval$ = combineLatest(
  ani$,
  ani$.pipe(first()),
)
  .pipe(
    map(([currentTime, startTime]) => currentTime - startTime),
  )

export default interval$
