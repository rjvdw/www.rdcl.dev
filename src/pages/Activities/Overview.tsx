import classNames from 'classnames'
import React, { FunctionComponent, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Error } from '../../components/Error'
import { Label } from '../../components/Label'
import { LabelList } from '../../components/LabelList'
import { Dts } from './Dts'
import { useActivities } from './hooks'
import { Activity } from './types'
import { dateFuzzer, formatDate } from './util'

export const Overview = () => {
  const id = useId()
  const { activities, overlappingActivities, past, loading, errors } =
    useActivities()
  const [highlighted, setHighlighted] = useState<string[]>([])

  return (
    <>
      <h1>Activities</h1>

      <ActivitiesOverview
        activities={activities}
        highlighted={highlighted}
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

      {overlappingActivities.length > 0 && (
        <>
          <h2>Overlapping activities</h2>

          <ul className="activities__overlapping">
            {overlappingActivities.map(([a1, a2]) => (
              <li key={`${id}:${a1.id}:${a2.id}`}>
                <button
                  className="link"
                  onMouseEnter={() => setHighlighted([a1.id, a2.id])}
                  onMouseLeave={() => setHighlighted([])}
                  onFocus={() => setHighlighted([a1.id, a2.id])}
                  onBlur={() => setHighlighted([])}
                >
                  “{a1.title}” overlaps with “{a2.title}”.
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
export default Overview

type ActivitiesOverviewProps = {
  activities: Activity[]
  highlighted: string[]
  past: boolean
  loading: boolean
  errors: string[]
}

const ActivitiesOverview: FunctionComponent<ActivitiesOverviewProps> = ({
  activities,
  highlighted,
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
        <ActivityCard
          key={activity.id}
          activity={activity}
          highlighted={highlighted.indexOf(activity.id) !== -1}
        />
      ))}
    </div>
  )
}

type ActivityCardProps = {
  activity: Activity
  highlighted: boolean
}

const ActivityCard: FunctionComponent<ActivityCardProps> = ({
  activity,
  highlighted,
}) => {
  const fuzzed = dateFuzzer(activity)

  return (
    <div
      className={classNames('activities__overview-card', {
        'activities__overview-card--highlighted': highlighted,
      })}
    >
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
