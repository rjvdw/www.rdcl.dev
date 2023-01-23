import { differenceInDays } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Activity } from './types'
import { formatDate } from './util'

export type DateFuzzerProps = {
  activity: Activity
}

export const DateFuzzer: FunctionComponent<DateFuzzerProps> = ({
  activity,
}) => {
  const starts = new Date(Date.parse(activity.starts))
  const ends = activity.ends ? new Date(Date.parse(activity.ends)) : starts
  const now = new Date()

  if (starts <= now && now <= ends) {
    return <p className="activities__date-fuzzer">In progress</p>
  }

  convertToDay(starts)
  convertToDay(now)
  const diff = differenceInDays(starts, now)

  if (diff === 0) {
    return (
      <p className="activities__date-fuzzer">
        <time dateTime={formatDate(starts)}>Today</time>
      </p>
    )
  }

  if (diff === 1) {
    return (
      <p className="activities__date-fuzzer">
        <time dateTime={formatDate(starts)}>Tomorrow</time>
      </p>
    )
  }

  if (diff > 1 && diff < 5) {
    return (
      <p className="activities__date-fuzzer">
        <time dateTime={formatDate(starts)}>In a couple of days</time>
      </p>
    )
  }

  return null
}

function convertToDay(date: Date) {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}
