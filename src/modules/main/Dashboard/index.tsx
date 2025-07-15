/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Stack, Text } from "@mantine/core";
import { jwtDecode } from "jwt-decode";

import bg from "./assets/background.png";
import "./index.css";
import UserDashboard from "./components/UserDashboard";
import { JwtPayload, useAuthGlobalStore } from "@shared/store/auth";
import Approver from "./components/Approver";
import Reviewer from "./components/Reviewer";

export default function Dashboard() {
  const token = useAuthGlobalStore((state) => state.token);

  if (!token) return <></>;

  const decodedToken = jwtDecode<JwtPayload>(token);

  const rndrView = () => {
    if (decodedToken.CanApprove) {
      return <Approver />;
    } else if (decodedToken.CanReview) {
      return <Reviewer />;
    } else {
      return <UserDashboard />;
    }
  };

  return (
    <Stack className="h-full m-4 gap-0">
      <title>Dashboard</title>
      <Stack className="w-full h-full select-none gap-0">
        <Stack
          className="bg-cover bg-center mb-4 w-full h-[15%] p-8 rounded-lg select-none justify-center gap-0"
          style={{ backgroundImage: `url(${bg})` }}>
          <Text fz={30} fw={600} c={"white"}>
            Welcome, {decodedToken.EmployeeName}!
          </Text>
          <Text fz={14} c={"white"}>
            You're looking at HRDotNet, your new tool for work.
          </Text>
        </Stack>
        {rndrView()}
      </Stack>
    </Stack>
  );
}
