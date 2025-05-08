/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Stack, Text } from "@mantine/core";

import bg from "./assets/background.png";
import "./index.css";
import UserDashboard from "./components/UserDashboard";
// import Approver from "./components/Approver";
// import Reviewer from "./components/Reviewer";

export default function Dashboard() {
  return (
    <Stack className="h-full m-4 gap-0">
      <title>Dashboard</title>
      <Stack className="w-full h-full select-none gap-0">
        <Stack
          className="bg-cover bg-center mb-4 w-full h-[15%] p-8 rounded-lg select-none justify-center gap-0"
          style={{ backgroundImage: `url(${bg})` }}>
          <Text fz={30} fw={600} c={"white"}>
            Welcome, William Grant!
          </Text>
          <Text fz={14} c={"white"}>
            You're looking at HRDotNet, your new tool for work.
          </Text>
        </Stack>
        <UserDashboard />
        {/* <Reviewer /> */}
        {/* <Approver /> */}
      </Stack>
    </Stack>
  );
}
