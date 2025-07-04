import apiClient from "./api";

export interface HttpRequestConfig {
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

const apiService = {
  get: async <T>(url: string, config?: HttpRequestConfig): Promise<T> => {
    const { params, headers } = config || {};
    const { data } = await apiClient.get<T>(url, { params, headers });
    return data;
  },

  post: async <T>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> => {
    const { headers } = config || {};
    const response = await apiClient.post<T>(url, data, { headers });
    return response.data;
  },

  put: async <T>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> => {
    const { headers } = config || {};
    const response = await apiClient.put<T>(url, data, { headers });
    return response.data;
  },

  delete: async <T>(url: string, config?: HttpRequestConfig): Promise<T> => {
    const { params, headers } = config || {};
    const response = await apiClient.delete<T>(url, { params, headers });
    return response.data;
  },
};

export default apiService;
