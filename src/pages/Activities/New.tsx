import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ActivityForm } from './ActivityForm'
import { createActivity } from './api'

export const New = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1>New Activity</h1>
      <ActivityForm
        onSubmit={ async activity => {
          await createActivity(activity)
          navigate('/activities')
        } }
      />
    </>
  )
}
