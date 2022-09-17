import React from 'react'
import { Outlet } from 'react-router-dom'
import { ActiveRoute } from '../components/ActiveRoute'

export const Tools = () => (
  <>
    <ActiveRoute>tools</ActiveRoute>
    <Outlet/>
  </>
)

export default Tools
