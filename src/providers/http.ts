import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosKey } from '../symbols/symbol';
import { injectStrict } from '../utils/injectStrict';

const createConfig: AxiosRequestConfig = {
  baseURL:
    (import.meta.env.VITE_API_ENDPOINT as string | undefined) ?? 'https://localhost:3000/api',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 3000,
};

const instance = axios.create(createConfig);

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const http: AxiosInstance = instance;

export function useAxios() {
  return injectStrict(AxiosKey);
}
