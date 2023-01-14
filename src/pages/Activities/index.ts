import { Activities as ActivitiesComponent } from './Activities'
import { Details } from './Details'
import { Index } from './Index'
import { New } from './New'
import './styles.sass'

export const Activities = Object.assign(ActivitiesComponent, {
  Index,
  Details,
  New,
})
export default Activities
