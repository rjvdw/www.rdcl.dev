import classNames from 'classnames'
import { formatDate } from '../../../util/formatters'
import { preventDefault } from '../../../util/component'
import React from 'react'
import { formatNumber } from './helpers'
import { HealthData } from '../../../modules/health'
import { DataEntry } from './Health.component'
import { Icon } from './icons'

type HealthTableProps = {
  removing: { [date: string]: true },
  data: DataEntry[],
  removeEntry: (entry: HealthData) => void,
}

export const HealthTable: React.FunctionComponent<HealthTableProps> = ({ removeEntry, removing, data }) => (
  <section style={ { maxWidth: '100%', overflow: 'auto' } }>
    <table>
      <thead>
      <tr>
        <th>Datum</th>
        <th>Gewicht</th>
        <th>Gemiddeld</th>
        <th>Acties</th>
      </tr>
      </thead>
      <tbody>
      { data.map(entry => (
        <tr
          key={ entry.key }
          className={ classNames('health-table__row', {
            'health-table__row--removing': removing[entry.key],
          }) }
        >
          <td>{ formatDate(entry.date) }</td>
          <td data-numeric>{ formatNumber(entry.data.weight) }</td>
          <td data-numeric>{ formatNumber(entry.data.averageWeight) }</td>
          <td>
            <Icon.Remove
              className="health-table__action health-table__action--remove"
              role="button"
              tabIndex={ 0 }
              title="Regel verwijderen"
              onClick={ preventDefault(() => removeEntry(entry)) }
            />
          </td>
        </tr>
      )) }
      </tbody>
    </table>
  </section>
)
