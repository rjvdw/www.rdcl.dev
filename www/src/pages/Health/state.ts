export type HealthSettings = {
  height?: number
}

export type HealthData = {
  weight?: number
  bodyFat?: number
}

export type HealthRecord = {
  date: Date
  data: HealthData
}
