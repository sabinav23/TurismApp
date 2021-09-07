import axios from 'axios';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from './constants';
import { AuthContext } from '../App';
import { useHistory } from 'react-router';
import { addTokenInterceptor } from '../utils/axios';

export interface ILoginData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const { setUserData } = useContext(AuthContext);
  const history = useHistory();

  return useMutation(
    (login: ILoginData) => axios.post(`${API_URL}/Auth/login`, login),
    {
      onSuccess: ({ data }) => {
        const token = data.token;
        const isBusiness = data.isBusiness;
        setUserData({ token, isBusiness });
        addTokenInterceptor(token);
        history.push('/');
        history.go(0);
      },
    }
  );
};
