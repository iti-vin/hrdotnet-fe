/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useEffect, useState } from "react";
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { Button, Checkbox, Container, Flex, Image, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
//--- Icons
import loginBg from "./assets/loginBg.png";
import slideone from "./assets/slide_one.png";
import slidetwo from "./assets/slide_two.png";
import slidethree from "./assets/slide_three.png";
import loginLogo from "./assets/loginLogo.png";
import useLogin from "./components/hooks";
import { Carousel } from "@mantine/carousel";

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

const slides = [slideone, slidetwo, slidethree];
const SLIDE_INTERVAL = 3000;

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

  const [rememberMe, setRememberMe] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" h-full flex select-none bg-white items-center">
      <title>Login</title>
      <div className="bg-cover w-1/2 hidden sm:block p-5 h-full">
        <div style={{ backgroundImage: `url(${loginBg})` }} className="bg-cover h-full w-full flex flex-col rounded-xl overflow-hidden">
          <Stack className="h-full p-8">
            <Image src={loginLogo} className="cursor-pointer w-36 2xl:w-48" alt="bg" />
            <Stack className="h-full items-center justify-center">
              <Carousel withIndicators withControls={false} height="100%" initialSlide={currentIndex} onSlideChange={setCurrentIndex}>
                <Carousel.Slide className="h-full">
                  <Container className="h-full mb-28 items-center justify-center flex flex-col">
                    <Image src={slideone} className="cursor-grab w-96" alt="bg" />
                    <Text fz={25} c="white" fw={700} className="text-center" children="Track Your Time," />
                    <Text fz={25} c="white" fw={700} className="text-center" children="Leaves and Schedules" />
                    <Text w={370} c="white" className="items-center text-center" children="Check your time logs, file leave, OT, offset, OB, and manage your work schedule." />
                  </Container>
                </Carousel.Slide>
                <Carousel.Slide>
                  <Container className="h-full mb-28 items-center justify-center flex flex-col">
                    <Image src={slidetwo} className="cursor-grab w-96" alt="bg" />
                    <Text fz={25} c="white" fw={700} className="text-center" children="View Your Payslips" />
                    <Text fz={25} c="white" fw={700} className="text-center" children="and Loan Records" />
                    <Text
                      w={370}
                      c="white"
                      className="items-center text-center"
                      children="Access your loan details, 13th month and final pay anytime-transparently and securely."
                    />
                  </Container>
                </Carousel.Slide>
                <Carousel.Slide>
                  <Container className="h-full mb-28 items-center justify-center flex flex-col">
                    <Image src={slidethree} className="cursor-grab w-96" alt="bg" />
                    <Text fz={25} c="white" fw={700} className="text-center" children="All Your Employee" />
                    <Text fz={25} c="white" fw={700} className="text-center" children="Records in one Place" />
                    <Text
                      w={370}
                      c="white"
                      className="items-center text-center"
                      children="Update your profile, check your benefits and review your employment history with ease."
                    />
                  </Container>
                </Carousel.Slide>
                {/* ...other slides */}
              </Carousel>
            </Stack>
          </Stack>
        </div>
      </div>
      <div className=" w-full sm:w-1/2">
        <div className="h-full w-full flex flex-col">
          <form onSubmit={loginForm.onSubmit(handleSubmit)} className="flex flex-col gap-4 sm:h-[55%] sm:w-[55%] m-auto p-4 sm:p-0" autoComplete="on">
            <div className="text-center font-extrabold text-4xl text-[#334155]">Welcome Back</div>
            <div className="text-center font-extrabold text-md text-[#969696]">Enter your username and password to proceed.</div>
            <TextInput
              id="username"
              name="username"
              autoComplete="username"
              label="Username"
              variant="default"
              size="md"
              radius="md"
              classNames={{ input: "poppins" }}
              placeholder="Enter your username"
              disabled={loginMutation.isPending}
              {...loginForm.getInputProps("username")}
            />

            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              label="Password"
              classNames={{ innerInput: "poppins" }}
              variant="default"
              size="md"
              radius="md"
              placeholder="Enter your password"
              error={serverError}
              disabled={loginMutation.isPending}
              {...loginForm.getInputProps("password")}
            />

            {serverError && <Text c="red">{serverError}</Text>}

            <Flex justify="space-between">
              <Checkbox label="Remember me" c="#6d6d6d" checked={rememberMe} onChange={(event) => setRememberMe(event.currentTarget.checked)} disabled={loginMutation.isPending} />
              <Text fz={14} c="#559CDA" fw={600}>
                {/* Forgot Password? */}
              </Text>
            </Flex>
            <Button
              type="submit"
              size="lg"
              id="submit-login"
              className="br-gradient border-none bg-blue-300 mt-7 shadow-sm shadow-orange-200"
              disabled={loginMutation.isPending}
              loading={loginMutation.isPending}>
              <Text className="poppins text-white ">LOG IN</Text>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
