import { Meter, MetersResponse } from "../types";
import { runInTransaction } from "./runInTransaction";
import { MetersStore } from "../store";

let uniqueNumber = 0

export const fillMetersStore = (data: MetersResponse, offset: number) => {
  const updatedList = addNumberToObjectsWithCounter(data.results, offset)

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
    number: currentCounter > 19 ? currentCounter - 20 + idx + 1 : currentCounter + idx + 1
  }));

  return {
    data: numberedItems,
    updatedCounter: currentCounter - items.length
  };
}