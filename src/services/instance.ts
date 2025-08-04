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
      const token = localStorage.getItem("accessToken");
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
      console.log({ error });
      return Promise.reject(error?.response?.data);
    }
  );

  return instance;
};

export const fetcher: AxiosInstance = injectInterceptors(
  axios.create({
    baseURL: "https://lms-be-development.hammercode.org/api/v1/",
    ...config,
  })
);

export const fetcherLocal: AxiosInstance = injectInterceptors(axios.create(config));
