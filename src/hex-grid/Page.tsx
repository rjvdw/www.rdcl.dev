import './hex-grid.sass'
import React from 'react'
import { range } from '../lib/Range'
import { HexGrid } from './HexGrid'
import { example, useExamples } from './Page.hooks'
import { catan } from './catan'

export const Page = () =>
  useExamples(
    example('', () => (
      <HexGrid>
        {{
          bounds: {
            x: range`-10..=10`,
            y: range`-5..=5`,
          },
        }}
      </HexGrid>
    )),
    example('catan', () => (
      <HexGrid>{catan`
    |   g h _ m _ _   |
    |  _ _ _ f _ d _  |
    | m F h F p f d _ |
    |_ m F m p h d _ _|
    | h p _ _ h _ _ g |
    |  _ f _ f F _ f  |
    |   m _ p p _ F   |

    ${[
      8, 2, 10, 11, 12, 6, 11, 10, 3, 9, 3, 4, 6, 5, 4, 8, 9, 10, 6, 3, 8, 9, 4,
      5, 11, 2, 5,
    ]}
    `}</HexGrid>
    ))
  )
