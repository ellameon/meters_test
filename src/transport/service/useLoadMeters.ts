import { transport } from "../transport";
import { useState } from "react";
import { useQuery } from "react-query";

export const useLoadMeters = () => {
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)

  const loadMeters = () => transport.list(limit, offset)

  const {data, isLoading, refetch} = useQuery(
    "meters",
    loadMeters,
    {
      keepPreviousData: true
    }
  );

  return {
    metersList: data?.data,
    refetch,
    setLimit,
    setOffset,
    offset,
    isLoading
  }
}