import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ActivityForm } from './ActivityForm'
import { useActivitiesApi } from './api'

export const New = () => {
  const api = useActivitiesApi()
  const navigate = useNavigate()

  return (
    <>
      <h1>New Activity</h1>
      <ActivityForm
        onSubmit={async (activity) => {
          await api.create(activity)
          navigate('/activities')
        }}
      />
    </>
  )
}
