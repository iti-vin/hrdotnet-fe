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
import { IconEye, IconEyeOff, IconMail, IconShieldLock } from "@tabler/icons-react";
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

export default function Login() {
  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value.length >= 5 ? null : "Password must be at least 5 characters"),

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
            <Flex direction="row" justify="center" gap={5} className="w-full">
              <Text c="#6d6d6d" size="sm" ta="center" fw={500}>
                Forgot Password ?
              </Text>
              <Text c="#559cda" size="sm" ta="center" fw={500} className="underline cursor-pointer">
                Contact System Administrator
              </Text>
            </Flex>
            <div className="w-full text-start text-slate-700 mt-6">
              <Text size="md" className="poppins">
                Username
              </Text>
              <TextInput
                variant="default"
                size="md"
                radius="md"
                classNames={{ input: "poppins" }}
                id="username"
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
                classNames={{ input: "poppins text-[#6D6D6D] pr-10" }}
                variant="default"
                size="md"
                radius="md"
                id="password"
                placeholder="Enter your password"
                error={serverError}
                onVisibilityChange={() => setVisible((v) => !v)}
                visible={visible!}
                rightSection={
                  <div className="flex flex-row items-center gap-3 pr-7">
                    <div className=" cursor-pointer">{visible ? <IconEyeOff size={16} onClick={handleVisible} /> : <IconEye size={16} onClick={handleVisible} />}</div>
                    <div className="bg-[#ED8028] p-2 rounded-lg text-white">
                      <IconShieldLock />
                    </div>
                  </div>
                }
                {...loginForm.getInputProps("password")}
              />
              {serverError && <Text c="red">{serverError}</Text>}
            </div>
            <Button
              type="submit"
              size="lg"
              id="submit-login"
              className="br-gradient border-none bg-blue-300 mt-7 shadow-sm shadow-orange-200"
              disabled={loginMutation.isPending}
              loading={loginMutation.isPending}>
              <Text className="poppins text-white ">Login</Text>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
