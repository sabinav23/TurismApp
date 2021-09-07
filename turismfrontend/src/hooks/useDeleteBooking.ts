import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from './constants';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number | undefined) => axios.delete(`${API_URL}/bookings/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getBookedLocations');
      },
    }
  );
};
