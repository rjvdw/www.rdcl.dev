import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Label } from '../../components/Label'
import { LabelList } from '../../components/LabelList'
import { DateFuzzer } from './DateFuzzer'
import { Dts } from './Dts'
import { useActivities } from './hooks'
import { Activity } from './types'

export const Overview = () => {
  const { activities, past, loading, error } = useActivities()

  return (
    <>
      <h1>Activities</h1>

      <ActivitiesOverview
        activities={activities}
        past={past}
        loading={loading}
        error={error}
      />

      {past ? (
        <p>
          <Link to="/activities">Back to current activities</Link>
        </p>
      ) : (
        <p>
          <Link to="/activities/new">Add activity</Link>
          <br />
          <Link to="/activities?past">Show past activities</Link>
        </p>
      )}
    </>
  )
}

type ActivitiesOverviewProps = {
  activities: Activity[]
  past: boolean
  loading: boolean
  error?: string
}

const ActivitiesOverview: FunctionComponent<ActivitiesOverviewProps> = ({
  activities,
  past,
  loading,
  error,
}) => {
  if (loading) {
    return past ? (
      <p>Loading past activities...</p>
    ) : (
      <p>Loading activities...</p>
    )
  }

  if (error) {
    return <p className="error-message">Failed to load activities: {error}</p>
  }

  if (activities.length === 0) {
    return past ? <p>No past activities</p> : <p>No activities yet</p>
  }

  return (
    <div className="activities__overview">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

type ActivityCardProps = {
  activity: Activity
}

const ActivityCard: FunctionComponent<ActivityCardProps> = ({ activity }) => (
  <div className="activities__overview-card">
    <h2>
      <Link to={`/activities/${activity.id}`}>{activity.title}</Link>
    </h2>

    <DateFuzzer activity={activity} />

    {activity.labels.length > 0 && (
      <LabelList>
        {activity.labels.map((label, i) => (
          <Label key={i}>{label}</Label>
        ))}
      </LabelList>
    )}

    {activity.ends ? (
      <p>
        Starts: <Dts activity={activity} prop="starts" />
        <br />
        Ends: <Dts activity={activity} prop="ends" />
      </p>
    ) : (
      <p>
        <Dts activity={activity} prop="starts" />
      </p>
    )}

    <p>{activity.location}</p>
  </div>
)
