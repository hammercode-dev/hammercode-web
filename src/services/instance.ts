import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const config = {
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

const injectInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError) => {
      return Promise.reject(error?.response?.data);
    }
  );

  return instance;
};

export const fetcher: AxiosInstance = injectInterceptors(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    ...config,
  })
);
