import axios from "axios";

export const login = async (values: { username: string; password: string }) => {
  const { data } = await axios.post("http://localhost:1234/auth/login", values, {
    headers: { "Content-Type": "application/json" },
  });

  return data;
};
