import React from 'react'
import { DebugToggle } from './DebugToggle'
import { HexGridCell } from './HexGrid.Cell'
import { HexGridContainer } from './HexGrid.Container'
import { HexGridRow } from './HexGrid.Row'
import { BaseCellSpec, Spec } from './types'

const DEFAULT_OFFSET = 'odd'

type HexGridProps<T extends BaseCellSpec> = {
  children: Spec<T>
  debug?: boolean
}

type HexGridState = {
  debugFromProps: boolean
  debug: boolean
}

export class HexGrid<T extends BaseCellSpec> extends React.Component<
  HexGridProps<T>,
  HexGridState
> {
  constructor(props: HexGridProps<T>) {
    super(props)
    const debug = props.debug ?? false
    this.state = {
      debugFromProps: debug,
      debug,
    }
  }

  static getDerivedStateFromProps<T extends BaseCellSpec>(
    props: HexGridProps<T>,
    state: HexGridState
  ): HexGridState {
    const debug = props.debug ?? false
    if (debug !== state.debugFromProps) {
      return {
        debugFromProps: debug,
        debug,
      }
    }

    return state
  }

  render() {
    const { children: spec } = this.props
    const { debug } = this.state
    const boundY = Array.from(spec.bounds.y)

    const toggleDebug = (v: boolean) => this.setState({ debug: v })
    const getBoundX = (row: number) =>
      Array.from(spec.cells?.[row]?.bounds ?? spec.bounds.x)
    const getCellSpec = (row: number, col: number) =>
      spec.cells?.[row]?.cells?.[col]

    return (
      <div className="hex-grid-wrapper">
        <DebugToggle debug={debug} toggle={toggleDebug} />

        <HexGridContainer offset={spec.offset ?? DEFAULT_OFFSET}>
          {boundY.map((row) => (
            <HexGridRow key={row} row={row}>
              {getBoundX(row).map((col) => (
                <HexGridCell
                  key={col}
                  row={row}
                  col={col}
                  debug={debug}
                  cellSpec={getCellSpec(row, col)}
                />
              ))}
            </HexGridRow>
          ))}
        </HexGridContainer>
      </div>
    )
  }
}
