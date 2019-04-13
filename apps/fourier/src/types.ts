export type FormulaType = (input: number) => number
export type DataPoint = [number, number]
export type Coord = [number, number]

export type CursorType = Coord
export type GraphType = DataPoint[]

export type DrawData = {
  cursor: CursorType,
  graph: GraphType,
}
