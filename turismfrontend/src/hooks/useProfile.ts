import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../models/User';
import { API_URL } from './constants';

export const useProfile = () =>
  useQuery<User>({
    queryKey: 'getProfile',
    queryFn: () => axios.get(`${API_URL}/Users/me`),
    enabled: true,
    select: (r: any) => r.data,
  });
