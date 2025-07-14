import type { AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "./api";

export type HttpRequestConfig<D = unknown> = Omit<AxiosRequestConfig<D>, "data">;

const apiService = {
  get: async <T>(url: string, config?: HttpRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get<T>(url, config);
    return response.data;
  },

  post: async <T, D = unknown>(url: string, payload?: D, config?: HttpRequestConfig<D>): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post<T, AxiosResponse<T>, D>(url, payload, config);
    return response.data;
  },

  put: async <T, D = unknown>(url: string, payload?: D, config?: HttpRequestConfig<D>): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put<T, AxiosResponse<T>, D>(url, payload, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: HttpRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

export default apiService;
