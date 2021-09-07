import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from './constants';

export const useDeleteFavoriteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string | undefined) =>
      axios.delete(`${API_URL}/favoriteLocations/${id}`),
    {
      onSuccess: () => {
        queryClient.removeQueries('getFavoriteLocation');
      },
    }
  );
};
