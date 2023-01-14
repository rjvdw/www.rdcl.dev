import React from 'react'
import { Index } from '../../tools/Index'
import { Tools as ToolsComponent } from './Tools'

export const Tools = Object.assign(ToolsComponent, {
  Index,
  Ascii: React.lazy(() => import('../../tools/Ascii')),
  Bmi: React.lazy(() => import('../../tools/Bmi')),
  Countdown: React.lazy(() => import('../../tools/Countdown')),
  DropRates: React.lazy(() => import('../../tools/DropRates')),
  Float: React.lazy(() => import('../../tools/Float')),
  MarkdownViewer: React.lazy(() => import('../../tools/MarkdownViewer')),
  Ratings: React.lazy(() => import('../../tools/Ratings')),
  UUID: React.lazy(() => import('../../tools/Uuid')),
})
export default Tools
