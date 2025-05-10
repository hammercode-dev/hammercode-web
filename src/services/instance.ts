import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const config = {
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

const attachInterceptors = (instance: AxiosInstance): AxiosInstance => {
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

export const fetcher: AxiosInstance = attachInterceptors(
  axios.create({
    baseURL: "https://lms-be-development.hammercode.org/api/v1/",
    ...config,
  })
);

export const fetcherLocal: AxiosInstance = attachInterceptors(axios.create(config));
