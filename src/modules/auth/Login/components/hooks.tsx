import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "./services";
export default function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.accessToken);
      navigate("/change-schedule");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error.response?.data?.error?.[0]?.message || "Login failed";
      throw new Error(errorMessage);
    },
  });
}
