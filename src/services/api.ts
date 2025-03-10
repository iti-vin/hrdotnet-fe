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

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}api/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessTokenFlash");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshTokenFromCookie();
        if (refreshToken) {
          sessionStorage.setItem("accessTokenFlash", refreshToken);
          originalRequest.headers["Authorization"] = refreshToken;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
