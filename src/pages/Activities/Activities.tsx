import React from 'react'
import { Outlet } from 'react-router-dom'
import { ActiveRoute } from '../../components/ActiveRoute'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'

export const Activities = () => (
  <>
    <RequireLogin />
    <Title>activities</Title>
    <ActiveRoute>activities</ActiveRoute>
    <Outlet />
  </>
)
