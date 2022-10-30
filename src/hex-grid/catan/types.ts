import { FunctionComponent } from 'react'
import { BaseCellSpecElementProps } from '../types'

export type ResourceTile =
  | 'forest'
  | 'pasture'
  | 'field'
  | 'hill'
  | 'mountain'
  | 'gold field'

export type OtherTile =
  | 'ocean'
  | 'desert'

export type Tile = ResourceTile | OtherTile

export type CatanCellSpec = {
  outOfBounds: true
} | {
  outOfBounds: false
  modifier: ResourceTile
  value: number
  element: FunctionComponent<BaseCellSpecElementProps>
} | {
  outOfBounds: false
  modifier: OtherTile
}
