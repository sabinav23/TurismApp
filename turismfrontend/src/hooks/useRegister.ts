import axios from 'axios';
import { useMutation } from 'react-query';
import { API_URL } from './constants';
import { useHistory } from 'react-router';

export interface IRegisterData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  age: number;
  isBusiness: boolean;
}

export const useRegister = () => {
  const history = useHistory();

  return useMutation(
    (register: IRegisterData) =>
      axios.post(`${API_URL}/Auth/register`, register),
    {
      onSuccess: () => {
        history.push('/login');
      },
    }
  );
};
