import React, { FunctionComponent, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotify } from '../../components/Notifications'
import { ActivityForm } from './ActivityForm'
import { Dts } from './Dts'
import { deleteActivity, updateActivity } from './api'
import { useActivity } from './hooks'
import { Activity } from './types'
import { formatUrl } from './util'

export const Details = () => {
  const { activity, setActivity, loading, error } = useActivity()
  const [editing, setEditing] = useEditing()
  const navigate = useNavigate()
  const notify = useNotify()

  const deleteClickHandler = async () => {
    if (activity && window.confirm('Are you sure?')) {
      await deleteActivity(activity.id)
      notify(`Activity "${ activity.title }" was deleted successfully`)
      navigate('/activities')
    }
  }

  if (loading) {
    return <>
      <h1>Loading activity...</h1>
      <p>Just a moment please</p>
    </>
  }

  if (error || !activity) {
    return <>
      <h1>Failed to load activity</h1>
      <p className="error-message">{ error || 'activity not found' }</p>
    </>
  }

  return <>
    <h1>{ activity.title }</h1>

    { editing ? (
      <ActivityForm
        activity={ activity }
        onSubmit={ async updated => {
          const result = await updateActivity(activity.id, updated)
          setEditing(false)
          setActivity(result)
        } }
      />
    ) : (
      <View activity={ activity }/>
    ) }

    <h2>Actions</h2>

    <div className="activities__activity-controls">
      { editing ? (
        <button onClick={ () => setEditing(false) }>Discard changes</button>
      ) : (
        <>
          <button onClick={ () => setEditing(true) }>Edit activity</button>
          <button onClick={ () => deleteClickHandler() }>Delete activity</button>
        </>
      ) }
    </div>
  </>
}

type ViewProps = {
  activity: Activity,
}

const View: FunctionComponent<ViewProps> = ({ activity }) => (
  <>
    <dl className="activities__details">
      <dt>Location</dt>
      <dd>{ activity.location }</dd>

      { activity.url && (
        <>
          <dt>URL</dt>
          <dd>
            <a
              href={ activity.url }
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              { formatUrl(activity.url) }
            </a>
          </dd>
        </>
      ) }

      <dt>Starts</dt>
      <dd><Dts activity={ activity } prop="starts"/></dd>

      { activity.ends && (
        <>
          <dt>Ends</dt>
          <dd><Dts activity={ activity } prop="ends"/></dd>
        </>
      ) }
    </dl>

    { activity.description && (
      <ReactMarkdown>{ activity.description }</ReactMarkdown>
    ) }

    { activity.notes && <>
      <h2>Notes</h2>
      <ReactMarkdown>{ activity.notes }</ReactMarkdown>
    </> }
  </>
)

function useEditing(): [boolean, (value: boolean) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const editing = useMemo(
    () => searchParams.has('editing'),
    [searchParams],
  )

  const setEditing = (value: boolean) => setSearchParams(value ? 'editing' : '')

  return [editing, setEditing]
}
