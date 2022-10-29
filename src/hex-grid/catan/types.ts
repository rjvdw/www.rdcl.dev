export type Tile =
  | 'forest'
  | 'pasture'
  | 'field'
  | 'hill'
  | 'mountain'
  | 'gold field'
  | 'ocean'
  | 'desert'

export type CatanCellSpec = {
  outOfBounds: true
} | {
  outOfBounds: false
  modifier: Tile
  value: number
}
