/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useEffect } from "react";
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
    <Fragment>
      <title>Overtime</title>
      <PanelNav>
        {overtimeTabs.map((item) => (
          <NavLink
            to={item.path}
            key={item.index}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            onClick={() => setActiveTab(item.index)}>
            {item.label}
          </NavLink>
        ))}
      </PanelNav>
      <Stack className="bg-white m-4 mt-16 -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0 select-none">
        <Outlet />
      </Stack>
    </Fragment>
  );
};

export default function Overtime() {
  return (
    <OvertimeProvider>
      <OvertimeContent />
    </OvertimeProvider>
  );
}
