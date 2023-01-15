import { Activities as ActivitiesComponent } from './Activities'
import { Details } from './Details'
import { New } from './New'
import { Overview } from './Overview'
import './styles.sass'

export const Activities = Object.assign(ActivitiesComponent, {
  Overview,
  Details,
  New,
})
export default Activities
