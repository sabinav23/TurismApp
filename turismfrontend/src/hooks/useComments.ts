import axios from 'axios';
import { useQuery } from 'react-query';
import { API_URL } from './constants';

export const useComments = (id: string | undefined) =>
  useQuery<any>({
    queryKey: ['getComments', id],
    queryFn: () => axios.get(`${API_URL}/comments/${id}`),
    enabled: true,
    select: (r: any) => r.data,
    retry: false,
  });
