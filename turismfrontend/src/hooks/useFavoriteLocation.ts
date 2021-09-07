import axios from 'axios';
import { useQuery } from 'react-query';
import { API_URL } from './constants';

export const useFavoriteLocation = (id: string | undefined) =>
  useQuery<any>({
    queryKey: ['getFavoriteLocation', id],
    queryFn: () => axios.get(`${API_URL}/favoriteLocations/${id}`),
    enabled: true,
    select: (r: any) => r.data,
    retry: false,
  });
