import { MetersResponse } from "../types";
import { makeObservableStore } from "./makeObservableStore";

export const MetersStore = makeObservableStore<MetersResponse>({
  count: 0,
  next: undefined,
  previous: undefined,
  results: []
})