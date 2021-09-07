import axios from 'axios';
import { useQuery } from 'react-query';
import { Location } from '../models/Location';
import { API_URL } from './constants';

export interface UseLocationsData {
  startDate?: Date | undefined | null;
  endDate?: Date | undefined | null;
  county?: string | undefined | null;
  isAccomodation: boolean;
}

export const useLocations = (data?: UseLocationsData) => {
  return useQuery<Location[]>({
    queryKey: ['getLocations', data],
    queryFn: () => {
      return axios.get(`${API_URL}/locations`, { params: data });
    },
    enabled: true,
    select: (r: any) => r.data,
  });
};
