import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Error } from '../../components/Error'
import { Label } from '../../components/Label'
import { LabelList } from '../../components/LabelList'
import { Dts } from './Dts'
import { useActivities } from './hooks'
import { Activity } from './types'
import { dateFuzzer, formatDate } from './util'

export const Overview = () => {
  const { activities, past, loading, errors } = useActivities()

  return (
    <>
      <h1>Activities</h1>

      <ActivitiesOverview
        activities={activities}
        past={past}
        loading={loading}
        errors={errors}
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
export default Overview

type ActivitiesOverviewProps = {
  activities: Activity[]
  past: boolean
  loading: boolean
  errors: string[]
}

const ActivitiesOverview: FunctionComponent<ActivitiesOverviewProps> = ({
  activities,
  past,
  loading,
  errors,
}) => {
  if (loading) {
    return past ? (
      <p>Loading past activities...</p>
    ) : (
      <p>Loading activities...</p>
    )
  }

  if (errors.length > 0) {
    return <Error errors={errors}>Failed to load activities</Error>
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

const ActivityCard: FunctionComponent<ActivityCardProps> = ({ activity }) => {
  const fuzzed = dateFuzzer(activity)

  return (
    <div className="activities__overview-card">
      <h2>
        <Link to={`/activities/${activity.id}`}>{activity.title}</Link>
      </h2>

      {fuzzed && (
        <p className="activities__date-fuzzer">
          <time dateTime={formatDate(activity.starts)}>{fuzzed}</time>
        </p>
      )}

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
}
