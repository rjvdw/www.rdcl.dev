import React from 'react'
import { HexGrid } from './HexGrid'
import { example, useExamples } from './Page.hooks'
import './hex-grid.sass'

export const Page = () => useExamples(
  example('', () =>
    <HexGrid>{ {
      bounds: {
        x: { start: -10, end: 10 },
        y: { start: -5, end: 5 },
      },
    } }</HexGrid>,
  ),
)
