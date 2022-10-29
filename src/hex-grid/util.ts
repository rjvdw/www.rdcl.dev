import { BoundRange } from './types'

export function boundRangeIter(bound: BoundRange): number[] {
  return Array.from(boundRangeGen(bound))
}

function* boundRangeGen(bound: BoundRange) {
  for (let i = bound.start; i <= bound.end; i += 1) {
    yield i
  }
}
