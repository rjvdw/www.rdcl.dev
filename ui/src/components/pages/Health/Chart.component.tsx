import { useHistoryState } from '../../../util/hooks'
import React, { ChangeEvent, Suspense } from 'react'
import { addDays, parseISO, subDays } from 'date-fns'
import { Aggregates } from '../../../modules/health'

const CanvasJSChart = React.lazy(() => import('./CanvasJS'))

type ChartProps = {
  from: string,
  to: string,
  graphData: Aggregates,
  title: string,
}

export const Chart: React.FunctionComponent<ChartProps> = ({ from, to, graphData, title, ...opts }) => {
  const [{ showData, showAverage }, setOptions] = useHistoryState('chartOptions', {
    showData: true,
    showAverage: true,
  })

  const onShowDataChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions({
      showData: event.target.checked,
      showAverage: true,
    })
  }

  const onShowAverageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions({
      showData: true,
      showAverage: event.target.checked,
    })
  }

  return (
    <section>
      <Suspense fallback={ <rdcl-spinner/> }>
        <CanvasJSChart options={ {
          title: title ? { text: title } : undefined,
          ...opts,
          axisX: {
            minimum: subDays(parseISO(from), 1),
            maximum: addDays(parseISO(to), 1),
          },
          axisY: {
            minimum: graphData.min! - 15,
            maximum: graphData.max! + 15,
          },
          data: [
            showData && {
              type: 'spline',
              dataPoints: graphData.dataPoints,
              color: '#4f81bc',
            },
            showAverage && {
              type: 'spline',
              dataPoints: graphData.runningAverage,
              color: '#c0504e',
            },
          ].filter(d => d),
        } }/>
      </Suspense>

      <div className="health-graph__options-container">
        <label className="health-graph__option">
          <input
            className="health-graph__option-checkbox"
            type="checkbox"
            checked={ showData }
            onChange={ onShowDataChanged }
          />
          Toon data
        </label>

        <label className="health-graph__option">
          <input
            className="health-graph__option-checkbox"
            type="checkbox"
            checked={ showAverage }
            onChange={ onShowAverageChanged }
          />
          Toon gemiddelde
        </label>
      </div>
    </section>
  )
}
