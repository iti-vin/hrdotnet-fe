/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Outlet } from "react-router-dom";
import { Stack } from "@mantine/core";

export default function Auth() {
  return (
    <Stack className="w-full h-screen">
      <Outlet />
    </Stack>
  );
}
