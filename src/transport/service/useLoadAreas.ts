import { transport } from '../transport';
import { useQuery } from 'react-query';

export const useLoadAreas = () => {
  const loadMeters = () => transport.listAreas();

  const { data, isLoading, refetch } = useQuery('areas', loadMeters, {
    keepPreviousData: true,
  });

  return {
    areasList: data?.data,
    refetch,
    isLoading,
  };
};
