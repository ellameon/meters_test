import { AddressResponse } from '../types/AddressResponse';
import { runInTransaction } from './runInTransaction';
import { AddressStore } from '../store';

export const fillAddressStore = (data: AddressResponse) => {
  runInTransaction(() => {
    AddressStore.count = data.count;
    AddressStore.next = data.next;
    AddressStore.previous = data.previous;

    AddressStore.results = data.results.filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    );
  });
};
