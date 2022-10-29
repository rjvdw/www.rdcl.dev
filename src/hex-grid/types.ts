export type BoundRange = {
  start: number,
  end: number,
}

export type Spec = {
  bounds: {
    x: BoundRange,
    y: BoundRange,
  },
}
