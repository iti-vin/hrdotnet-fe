/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useEffect } from "react";
import { Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

import PanelNav from "@/layout/main/panel";

import { OvertimeProvider, useOvertimeContext } from "./context";
import { useOvertimeStore } from "./store";
import "./index.css";

const OvertimeContent = () => {
  const { overtimeTabs } = useOvertimeContext();
  const { activeTab, setActiveTab, setStoredFilters, setStoredPage, setSelectedRecords } = useOvertimeStore();

  useEffect(() => {
    setSelectedRecords([]);
    setStoredFilters([]);
    setStoredPage([]);
  }, [activeTab]);

  return (
    <Stack className="h-full">
      <title>Overtime</title>
      <PanelNav>
        {overtimeTabs.map((item) => (
          <NavLink to={item.path} key={item.index} className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => setActiveTab(item.index)}>
            {item.label}
          </NavLink>
        ))}
      </PanelNav>
      <Stack className="h-full bg-white mx-4 mb-3 p-8 rounded-lg select-none overflow-hidden">
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default function Overtime() {
  return (
    <OvertimeProvider>
      <OvertimeContent />
    </OvertimeProvider>
  );
}
