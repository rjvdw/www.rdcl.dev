import { Tile } from './types'

export const CELL_CHAR_WIDTH = 3
export const CELL_MODIFIERS: Record<string, Tile> = {
  f: 'forest',
  p: 'pasture',
  F: 'field',
  h: 'hill',
  m: 'mountain',
  g: 'gold field',
  o: 'ocean',
  d: 'desert',
}
