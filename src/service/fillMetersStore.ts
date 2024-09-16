import { Meter, MetersResponse } from "../types";
import { runInTransaction } from "./runInTransaction";
import { MetersStore } from "../store";

let uniqueNumber = 0

export const fillMetersStore = (data: MetersResponse) => {
  const updatedList = addNumberToObjectsWithCounter(data.results, uniqueNumber)

  runInTransaction(() => {
    MetersStore.count = data.count
    MetersStore.next = data.next
    MetersStore.previous = data.previous
    MetersStore.results = updatedList.data
  })

  uniqueNumber = updatedList.updatedCounter
}

function addNumberToObjectsWithCounter(items: Meter[], currentCounter: number): { data: (Meter)[], updatedCounter: number } {
  const numberedItems = items.map((item, idx) => ({
    ...item,
    number: currentCounter + idx + 1
  }));

  return {
    data: numberedItems,
    updatedCounter: currentCounter + items.length
  };
}