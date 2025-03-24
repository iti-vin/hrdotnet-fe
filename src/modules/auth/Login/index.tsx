/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useState } from "react";
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { Button, Flex, Image, PasswordInput, Text, TextInput } from "@mantine/core";
//--- Icons
import { IconMail, IconShieldLock } from "@tabler/icons-react";
import loginBg from "./assets/loginBg.png";
import loginLogo from "./assets/loginLogo.png";
import useLogin from "./components/hooks";

interface Error {
  response: {
    data: {
      errors: [{ code: string; errorType: number; message: string }];
      hasErrors: boolean;
    };
  };
  message: string;
  name: string;
}

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

  const loginMutation = useLogin();
  const [serverError, setServerError] = useState("");

  const handleSubmit = (values: { username: string; password: string }) => {
    setServerError("");
    loginMutation.mutate(values, {
      onError: (error: Error) => setServerError(error.response.data.errors[0].message),
    });
  };

  JSON.stringify(loginForm.values);

  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className=" h-full flex select-none">
      <title>Login</title>
      <div className="bg-cover  w-1/2  hidden sm:block">
        <div style={{ backgroundImage: `url(${loginBg})` }} className="bg-cover h-full w-full flex flex-col">
          <Image src={loginLogo} className="cursor-pointer w-36 2xl:w-48 pl-10 py-10" alt="bg" />
        </div>
      </div>
      <div className=" w-full sm:w-1/2">
        <div className="h-full w-full flex flex-col">
          <form onSubmit={loginForm.onSubmit(handleSubmit)} className="flex flex-col gap-4 sm:h-[55%] sm:w-[55%] m-auto p-4 sm:p-0">
            <p className=" text-center font-semibold poppins text-4xl text-[#559CDA]">Admin Log-in</p>
            <Flex className="gap-1">
              <Text className="text-[#6d6d6d] text-sm">Forgot Password ?</Text>
              <Text className="text-[#559cda] underline text-sm">Contact System Administrator</Text>
            </Flex>
            <div className="w-full text-start text-slate-700 mt-6">
              <Text size="md" className="poppins ">
                Username
              </Text>
              <TextInput
                variant="default"
                size="md"
                radius="md"
                classNames={{ input: "poppins" }}
                placeholder="Enter your username"
                rightSection={
                  <div className="bg-[#559CDA] p-2 rounded-lg text-white">
                    <IconMail />
                  </div>
                }
                {...loginForm.getInputProps("username")}
              />
            </div>
            <div className="text-start text-slate-700">
              <Text size="md" className="poppins">
                Password
              </Text>
              <PasswordInput
                classNames={{ input: "poppins" }}
                variant="default"
                size="md"
                visible={visible}
                radius="md"
                placeholder="Enter your password"
                error={serverError}
                rightSection={
                  <div className="bg-[#ED8028] p-2 rounded-lg text-white cursor-pointer">
                    <IconShieldLock onClick={handleVisible} />
                  </div>
                }
                {...loginForm.getInputProps("password")}
              />
              {serverError && <Text c="red">{serverError}</Text>}
            </div>
            <Button type="submit" size="lg" className="br-gradient border-none bg-blue-300 mt-7 shadow-sm shadow-orange-200" disabled={loginMutation.isPending}>
              <Text className="poppins text-white ">Login Now</Text>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
