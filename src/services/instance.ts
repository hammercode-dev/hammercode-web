import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const config = {
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

const injectInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
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
    // baseURL: "https://lms-be-development.hammercode.org/api/v1/",
    baseURL: "http://localhost:8000/api/v1/",
    withCredentials: true,
    ...config,
  })
);

export const fetcherLocal: AxiosInstance = injectInterceptors(axios.create(config));
