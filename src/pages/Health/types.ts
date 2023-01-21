export type HealthData = {
  weight?: number
  bodyFat?: number
}

export type HealthRecord = {
  date: string
  data: HealthData
}
