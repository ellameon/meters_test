import { Meter } from "./Meter";

export type MetersResponse = {
  count: number
  next?: string | null
  previous?: string | null
  results: Meter[]
}

