export type Meter = {
  id: string
  _type: ("ColdWaterAreaMeter" | "HotWaterAreaMeter" | "AreaMeter")[]
  area: {
    id: string
  }
  is_automatic: boolean
  communication: string
  description: string
  serial_number: string
  installation_date: Date
  brand_name: string
  model_name: string
  initial_values: number[]
  number?: number
}
