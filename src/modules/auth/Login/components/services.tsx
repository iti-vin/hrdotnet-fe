import axios from "axios";

export const login = async (values: { username: string; password: string }) => {
  const { data } = await axios.post(`${import.meta.env.VITE_AUTH_BASE_URL}/auth/login`, values, {
    headers: { "Content-Type": "application/json" },
  });

  return data;
};
