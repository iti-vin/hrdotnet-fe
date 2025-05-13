import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "./services";
import { useAuthGlobalStore } from "@shared/store/auth";
export default function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.accessToken);
      useAuthGlobalStore.getState().setToken(data.accessToken);

      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error.response?.data?.error?.[0]?.message || "Login failed";
      throw new Error(errorMessage);
    },
  });
}
