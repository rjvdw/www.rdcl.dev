export type Activity = {
  id: string
  title: string
  description?: string
  notes?: string
  url?: string
  location: string
  starts: string
  ends?: string
  allDay: boolean
}
