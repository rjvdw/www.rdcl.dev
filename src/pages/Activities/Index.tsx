import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Dts } from './Dts'
import { useActivities } from './hooks'
import { Activity } from './types'

export const Index = () => {
  const { activities, loading, error } = useActivities()

  return <>
    <h1>Activities</h1>

    <ActivitiesOverview
      activities={ activities }
      loading={ loading }
      error={ error }
    />

    <p>
      <Link to="/activities/new">Add activity</Link>
    </p>
  </>
}

type ActivitiesOverviewProps = {
  activities: Activity[],
  loading: boolean,
  error?: string,
}

const ActivitiesOverview: FunctionComponent<ActivitiesOverviewProps> = (
  { activities, loading, error },
) => {
  if (loading) {
    return <p>Loading activities...</p>
  }

  if (error) {
    return <p className="error-message">Failed to load activities: { error }</p>
  }

  if (activities.length === 0) {
    return <p>No activities yet</p>
  }

  return (
    <div className="activities__overview">
      { activities.map(activity => (
        <ActivityCard key={ activity.id } activity={ activity }/>
      )) }
    </div>
  )
}

type ActivityCardProps = {
  activity: Activity
}

const ActivityCard: FunctionComponent<ActivityCardProps> = (
  { activity },
) => (
  <div className="activities__overview-card">
    <h2><Link to={ `/activities/${ activity.id }` }>{ activity.title }</Link></h2>

    { activity.labels.length > 0 && (
      <ul className="activities__labels">
        { activity.labels.map((label, i) => (
          <li key={ i } className="label">{ label }</li>
        )) }
      </ul>
    ) }

    { activity.ends ? (
      <p>
        Starts: <Dts activity={ activity } prop="starts"/><br/>
        Ends: <Dts activity={ activity } prop="ends"/>
      </p>
    ) : (
      <p><Dts activity={ activity } prop="starts"/></p>
    ) }

    <p>{ activity.location }</p>
  </div>
)
