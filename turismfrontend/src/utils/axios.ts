import axios from 'axios';

export const addTokenInterceptor = (token: string) =>
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
