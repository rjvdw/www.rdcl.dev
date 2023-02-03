import { ChartData } from 'chart.js'
import { ChartOptions } from 'chart.js/dist/types'
import { differenceInDays } from 'date-fns'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HealthData, HealthRecord, HealthSettings } from './types'

type GraphConfiguration = {
  key: keyof HealthData
  label: string
  unit: string
  grace: number
}

const WEIGHT_GRAPH_CONFIGURATION: GraphConfiguration = {
  key: 'weight',
  label: 'Weight',
  unit: 'kg',
  grace: 15,
}

const BODY_FAT_GRAPH_CONFIGURATION: GraphConfiguration = {
  key: 'bodyFat',
  label: 'Body fat',
  unit: '%',
  grace: 10,
}

type GraphProps = {
  settings?: HealthSettings
  records: HealthRecord[]
}

export const Graph: FunctionComponent<GraphProps> = ({ settings, records }) => {
  return (
    <>
      <h3>Weight</h3>
      <SingleGraph
        settings={settings}
        records={records}
        configuration={WEIGHT_GRAPH_CONFIGURATION}
      />

      <h3>Body fat</h3>
      <SingleGraph
        settings={settings}
        records={records}
        configuration={BODY_FAT_GRAPH_CONFIGURATION}
      />
    </>
  )
}

type SingleGraphProps = GraphProps & {
  configuration: GraphConfiguration
}

const SingleGraph: FunctionComponent<SingleGraphProps> = ({
  records,
  configuration,
}) => {
  const { showData, showAverage } = useCheckboxes()

  const data = useData(
    records,
    configuration,
    showData.checked,
    showAverage.checked
  )
  const options = useOptions(configuration)

  return (
    <>
      <Line data={data} options={options} />
      <div className="health__graph-controls">
        <Checkbox {...showData}>Show data</Checkbox>
        <Checkbox {...showAverage}>Show average</Checkbox>
      </div>
    </>
  )
}

const useCheckboxes = (): {
  showData: { checked: boolean; setChecked(v: boolean): void }
  showAverage: { checked: boolean; setChecked(v: boolean): void }
} => {
  const [{ showData, showAverage }, setChecks] = useState({
    showData: true,
    showAverage: true,
  })
  const setShowData = (showData: boolean) =>
    setChecks(({ showAverage }) => ({
      showData,
      showAverage: showData ? showAverage : true,
    }))
  const setShowAverage = (showAverage: boolean) =>
    setChecks(({ showData }) => ({
      showData: showAverage ? showData : true,
      showAverage,
    }))

  return {
    showData: { checked: showData, setChecked: setShowData },
    showAverage: { checked: showAverage, setChecked: setShowAverage },
  }
}

type CheckboxProps = {
  checked: boolean
  setChecked(value: boolean): void
  children: React.ReactNode
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  checked,
  setChecked,
  children,
}) => (
  <label>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) =>
        setChecked((event.target as HTMLInputElement).checked)
      }
    />{' '}
    {children}
  </label>
)

const useData = (
  records: HealthRecord[],
  { key, label }: GraphConfiguration,
  showData: boolean,
  showAverage: boolean
) => {
  const data = useMemo(
    () => records.sort((a, b) => a.date.localeCompare(b.date)),
    [records]
  )

  const averagedData = useAveraged(data, key, 7)

  return useMemo(
    (): ChartData<'line', HealthRecord[], string> => ({
      datasets: [
        {
          label,
          data,
          parsing: {
            xAxisKey: 'date',
            yAxisKey: `data.${key}`,
          },
          borderColor: '#474069',
          spanGaps: true,
          showLine: showData,
          pointRadius: showData ? 3 : 1,
          order: 2,
        },
        {
          label: '7 day average',
          data: averagedData,
          parsing: {
            xAxisKey: 'date',
            yAxisKey: `data.${key}`,
          },
          borderColor: '#d22',
          spanGaps: true,
          showLine: showAverage,
          pointRadius: showAverage ? 3 : 1,
          order: 1,
        },
      ],
    }),
    [label, data, key, showData, averagedData, showAverage]
  )
}

const useAveraged = (
  data: HealthRecord[],
  key: keyof HealthData,
  windowSize: number
) =>
  useMemo(() => {
    const averaged: HealthRecord[] = []

    let window: HealthRecord[] = []
    let first: string | null = null
    for (const record of data) {
      if (first === null) {
        first = record.date
      }
      window = window
        .concat([record])
        .filter(({ date }) => daysDiff(date, record.date) < windowSize)
        .filter(({ data: { [key]: value } }) => value !== undefined)

      if (daysDiff(first, record.date) + 1 >= windowSize) {
        averaged.push({
          date: record.date,
          data: {
            [key]: avg(window, key),
          },
        })
      }
    }

    return averaged
  }, [data, key, windowSize])

function daysDiff(a: string, b: string): number {
  return Math.abs(differenceInDays(new Date(a), new Date(b)))
}

function avg(window: HealthRecord[], key: keyof HealthData): number {
  const v = window.reduce((c, p) => c + p.data[key]!, 0) / window.length

  return Number(v.toFixed(1))
}

const useOptions = ({ grace, unit }: GraphConfiguration) =>
  useMemo(
    (): ChartOptions<'line'> => ({
      responsive: true,
      scales: {
        x: {},
        y: {
          grace,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.formattedValue}${unit}`
            },
          },
        },
      },
    }),
    [grace, unit]
  )
