import { ResourceTile, Tile } from './types'

export function isResourceTile(tile: Tile): tile is ResourceTile {
  return (
    tile === 'forest' ||
    tile === 'pasture' ||
    tile === 'field' ||
    tile === 'hill' ||
    tile === 'mountain' ||
    tile === 'gold field'
  )
}
