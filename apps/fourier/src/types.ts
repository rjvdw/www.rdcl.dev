import { CANVAS_X_BOUND, SCALING_FACTOR } from '@/canvas/constants'

export type FormulaType = (input: number) => number
export type DataPoint = [number, number]
export type Coord = [number, number]

export type CursorType = Coord
export type GraphType = DataPoint[]

export type DrawData = {
  cursor: CursorType,
  graph: GraphType,
  now: number,
}

export class DataPointCollector {
  private readonly points: DataPoint[]
  private readonly boundary = CANVAS_X_BOUND / SCALING_FACTOR

  constructor(points: DataPoint[] = []) {
    this.points = points
  }

  concat([t, y]: DataPoint): DataPointCollector {
    const limit = t - this.boundary
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
