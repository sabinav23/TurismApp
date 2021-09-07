import axios from 'axios';
import { useQuery } from 'react-query';
import { Location } from '../models/Location';
import { API_URL } from './constants';

export const useLocation = (id: any) =>
  useQuery<Location>({
    queryKey: ['getLocation', id],
    queryFn: () => axios.get(`${API_URL}/locations/${id}`),
    enabled: true,
    select: (r: any) => r.data,
  });
