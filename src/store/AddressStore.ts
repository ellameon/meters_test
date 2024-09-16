import { makeObservableStore } from './makeObservableStore';
import { AddressResponse } from '../types/AddressResponse';

export const AddressStore = makeObservableStore<AddressResponse>({
  count: 0,
  next: undefined,
  previous: undefined,
  results: [],
});
