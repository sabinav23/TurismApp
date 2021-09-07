import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from './constants';

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number | undefined) => axios.delete(`${API_URL}/locations/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getProfile');
      },
    }
  );
};
