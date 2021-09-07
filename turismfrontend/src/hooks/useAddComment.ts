import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from './constants';

interface AddCommentData {
  id: string | undefined;
  text: string;
  stars: number;
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, text, stars }: AddCommentData) =>
      axios.post(`${API_URL}/comments/${id}`, { text, stars }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getComments');
      },
    }
  );
};
