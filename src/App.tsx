import React, { useEffect, useState } from 'react';
import './App.css';
import { useLoadAreas, useLoadMeters } from "./transport/service";
import { fillAddressStore } from "./service";
import { fillMetersStore } from "./service/fillMetersStore";
import { Table } from "./view/Table";
import { AddressStore, MetersStore } from "./store";
import { toJS } from "mobx";
import { Meter } from "./types";

function App() {
  const [list, setList] = useState<Meter[]>([])

  const {metersList, setOffset, refetch: refetchMeters, offset} = useLoadMeters()

  const {areasList} = useLoadAreas()

  useEffect(() => {
    areasList && fillAddressStore(areasList)
  }, [areasList])

  useEffect(() => {
    metersList && fillMetersStore(metersList, offset)
  }, [metersList])

  useEffect(() => {
    setList(toJS(MetersStore.results))
  }, [metersList, areasList, offset])

  return (
    <div className="App">
      { toJS(AddressStore.results).length > 0 && list &&
        <Table refetchMeters={refetchMeters}
               setOffset={setOffset}
               list={list}
        />
      }
    </div>
  );
}

export default App;
