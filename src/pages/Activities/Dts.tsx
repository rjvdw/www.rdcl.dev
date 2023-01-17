import React, { FunctionComponent } from 'react'
import { Activity } from './types'
import { formatDateTime } from './util'

type DtsProps = {
  activity: Activity
  prop: 'starts' | 'ends'
}

export const Dts: FunctionComponent<DtsProps> = ({ activity, prop }) => (
  <time dateTime={activity[prop]}>{formatDateTime(activity, prop)}</time>
)
