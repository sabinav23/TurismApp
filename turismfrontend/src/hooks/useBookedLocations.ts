import axios from 'axios';
import { useQuery } from 'react-query';
import { Booking } from '../models/Booking';
import { API_URL } from './constants';

export const useBookedLocations = () =>
  useQuery<Booking[]>({
    queryKey: 'getBookedLocations',
    queryFn: () => axios.get(`${API_URL}/bookings`),
    enabled: true,
    select: (r: any) => r.data,
  });
