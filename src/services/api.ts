import axios from "axios";

const getRefreshTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "refreshTokenFlash") {
      return value;
    }
  }
  return null;
};

const API_BASE_URL = "http://192.168.1.45:4321";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.defaults.headers.post["Content-Type"] = "application/json";

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
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
        console.error("Failed to refresh token", err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
