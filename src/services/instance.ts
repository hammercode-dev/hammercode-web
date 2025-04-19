import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const config = {
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetcher: AxiosInstance = axios.create({
  baseURL: "https://lms-be-development.hammercode.org/api/v1/",
  ...config,
});

export const fetcherLocal: AxiosInstance = axios.create({
  baseURL: "",
  ...config,
});

fetcher.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error?.response?.data);
  }
);
