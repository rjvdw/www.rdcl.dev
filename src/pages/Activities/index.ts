import React from 'react'
import { Activities as ActivitiesComponent } from './Activities'
import './styles.sass'

export const Activities = Object.assign(ActivitiesComponent, {
  Overview: React.lazy(() => import('./Overview')),
  Details: React.lazy(() => import('./Details')),
  New: React.lazy(() => import('./New')),
})
