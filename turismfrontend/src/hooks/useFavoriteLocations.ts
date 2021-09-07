import axios from 'axios';
import { useQuery } from 'react-query';
import { Location } from '../models/Location';
import { API_URL } from './constants';

export const useFavoriteLocations = () =>
  useQuery<Location[]>({
    queryKey: 'getFavoriteLocations',
    queryFn: () => axios.get(`${API_URL}/locations/favorites`),
    enabled: true,
    select: (r: any) => r.data,
  });
