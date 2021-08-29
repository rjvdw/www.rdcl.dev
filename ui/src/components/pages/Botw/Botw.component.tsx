import React from 'react'
import './Botw.styles.sass'
import { BotwState } from '../../../modules/botw'

type BotwProps = BotwState

export const Botw = ({ sets }: BotwProps) => <>
  <h1>Breath of the Wild</h1>

  <h2>Armor Sets</h2>

  <table className="botw-sets">
    <thead>
    <tr>
      <th>Gear Set</th>
      <th>Item</th>
      <th>★</th>
      <th>★★</th>
      <th>★★★</th>
      <th>★★★★</th>
    </tr>
    </thead>

    { sets.map(set => (
      <tbody key={ set.name }>
      { set.parts.map((part, idx) => (
        <tr key={ part.name }>
          { idx === 0 && <th rowSpan={ set.parts.length }>{ set.name === 'n/a' ? '' : set.name }</th> }
          <td>{ part.name }</td>
          { part.upgrades === null ? (
            <td colSpan={ 4 }>N/A</td>
          ) : part.upgrades.map((upgrade, idx) => (
            <td key={ idx }>
              <ul>
                { upgrade.map(([count, name], idx) => (
                  <li key={ idx }>{ count }× { name }</li>
                )) }
              </ul>
            </td>
          ))
          }
        </tr>
      )) }
      </tbody>
    )) }
  </table>
</>
