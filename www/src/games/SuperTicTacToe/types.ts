export type Player = 'x' | 'o'
export type Position = 0 | 1 | 2
export type Coordinate = [Position, Position]
export type Move = {
  player: Player
  board: Coordinate
  cell: Coordinate
}
