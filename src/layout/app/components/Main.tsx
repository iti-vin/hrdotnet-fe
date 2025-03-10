/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
//--- React Modules
import { Outlet } from "react-router-dom";

//--- Shared Hooks
import { useLogoWidth } from "@shared/hooks/useWidth";

export default function Main() {
  const isSmallViewport = useMediaQuery("(max-width: 991px)");
  const { isLogowordVisible } = useLogoWidth();

  return (
    <AppShell.Main pt={70} pl={isSmallViewport ? 0 : isLogowordVisible ? 250 : 70} pr={0}>
      <Outlet />
    </AppShell.Main>
  );
}
