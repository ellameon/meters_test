import { Address } from "./Address";

export type AddressResponse = {
  count: number
  next?: string | null
  previous?: string | null
  results: Address[]
}