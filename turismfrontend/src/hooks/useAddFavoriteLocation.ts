import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from './constants';

export const useAddFavoriteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string | undefined) =>
      axios.post(`${API_URL}/favoriteLocations/${id}`),
    {
      onSuccess: () => {
        queryClient.removeQueries('getFavoriteLocation');
      },
    }
  );
};
