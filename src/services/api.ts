import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_WEBHOST_BASE_URL;

const getRefreshTokenFromCookie = (): string | null => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshTokenFlash="))
      ?.split("=")[1] || null
  );
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem("authToken");
    const parsed = storedToken ? JSON.parse(storedToken) : null;
    const token = parsed?.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshTokenFromCookie();

        if (refreshToken) {
          sessionStorage.setItem("accessToken", refreshToken);
          originalRequest.headers["Authorization"] = refreshToken;
          return apiClient(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
