/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

import PanelNav from "@/layout/main/panel";

import { CTOProvider, useCTOContext } from "./context";
import "./index.css";

function CTOContent() {
  const { ctoTabs } = useCTOContext();
  return (
    <Stack className="h-full">
      <title>Compensatory Time-Off</title>
      <PanelNav>
        {ctoTabs.map((item) => (
          <NavLink to={item.path} key={item.index} className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => console.log(item.index)}>
            {item.label}
          </NavLink>
        ))}
      </PanelNav>
      <Stack className="h-full bg-white mx-4 mb-3 p-8 rounded-lg select-none overflow-hidden">
        <Outlet />
      </Stack>
    </Stack>
  );
}

export default function CTO() {
  return (
    <CTOProvider>
      <CTOContent />
    </CTOProvider>
  );
}
