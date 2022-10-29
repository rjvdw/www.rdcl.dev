import { Range } from '../lib/Range'

export type BaseCellSpec = {
  /**
   * When a cell is out of bounds, it will not be rendered.
   */
  outOfBounds?: boolean

  /**
   * If specified, an additional BEM-modifier is added (hex-grid__cell--${modifier}).
   */
  modifier?: string
}

export type RowSpec<T extends BaseCellSpec = BaseCellSpec> = {
  /**
   * If present, specifies the start and end index for this specific row.
   */
  bounds?: Range

  /**
   * Additional specifications for the individual cells.
   */
  cells?: Record<number, T>
}

export type Spec<T extends BaseCellSpec = BaseCellSpec> = {
  /**
   * Specifies the bounds for the board coordinates.
   * Not all coordinates within these bounds are necessarily valid, but if a coordinate is outside these bounds it's definitely not valid.
   */
  bounds: {
    x: Range,
    y: Range,
  },

  /**
   * In a hex grid, every other row must be offset.
   * This property indicates whether the odd or the even rows should be offset.
   * If left empty, the odd rows will be offset.
   */
  offset?: 'odd' | 'even'

  /**
   * Additional specifications for the individual rows.
   */
  cells?: Record<number, RowSpec<T>>
}
