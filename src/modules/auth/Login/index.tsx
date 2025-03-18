/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useNavigate } from "react-router-dom";
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
//--- Icons
import { IconMail, IconShieldLock } from "@tabler/icons-react";

export default function index() {
  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value.length >= 5 ? null : "Password must be at least 8 characters"),

      password: (value) => (value.length >= 8 ? null : "Password must be at least 8 characters"),
    },
  });

  JSON.stringify(loginForm.values);
  const navigate = useNavigate();

  const handleLogin = async (values: typeof loginForm.values) => {
    try {
      const response = await fetch("http://localhost:1234/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
      alert("Login successful!");
      navigate("/change-schedule");
      if (!response.ok) throw new Error(data.message || "Login failed");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={loginForm.onSubmit(handleLogin)}>
        <div className="flex flex-col gap-4  bg-white p-12 sm:p-16 rounded-lg shadow-md shadow-blue-300 ">
          <img className="logo self-center" alt="logo" src="/images/logoword.webp" />
          <Text size="md" className="text-center font-bold poppins mt-6" style={{ color: "#559CDA" }}>
            Log-in to your account.
          </Text>
          <div className="w-full text-start text-slate-700 mt-6">
            <TextInput
              variant="filled"
              size="md"
              radius="md"
              placeholder="Enter your email"
              rightSection={
                <div className="bg-blue-400 p-2 rounded-lg text-white">
                  <IconMail />
                </div>
              }
              withAsterisk
              key={loginForm.key("username")}
              {...loginForm.getInputProps("username")}
            />
          </div>
          <div className="text-start text-slate-700">
            <PasswordInput
              variant="filled"
              size="md"
              radius="md"
              placeholder="Enter your password"
              rightSection={
                <div className="bg-orange-400 p-2 rounded-lg text-white">
                  <IconShieldLock />
                </div>
              }
              withAsterisk
              key={loginForm.key("password")}
              {...loginForm.getInputProps("password")}
            />
          </div>
          <Button type="submit" variant="transparent" className="border-none br-gradient mt-7">
            <Text className="poppins text-white ">Login Now</Text>
          </Button>
        </div>
      </form>
    </div>
  );
}
