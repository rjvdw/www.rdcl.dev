import './hex-grid.sass'
import React from 'react'
import { range } from '../lib/Range'
import { HexGrid } from './HexGrid'
import { example, useExamples } from './Page.hooks'
import { catan } from './catan'

export const Page = () => useExamples(
  example('', () =>
    <HexGrid>{ {
      bounds: {
        x: range`-10..=10`,
        y: range`-5..=5`,
      },
    } }</HexGrid>,
  ),
  example('catan', () =>
    <HexGrid>{ catan`
    |         g08   h02   o00   m10   o00   o00         |
    |      o00   o00   o00   f11   o00   d00   o00      |
    |   m12   F06   h11   F10   p03   f09   d00   o00   |
    |o00   m03   F04   m06   p05   h04   d00   o00   o00|
    |   h08   p09   o00   o00   h10   o00   o00   g06   |
    |      o00   f03   o00   f08   F09   o00   f04      |
    |         m05   o00   p11   p02   o00   F05         |
    ` }</HexGrid>,
  ),
)
