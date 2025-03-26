/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

// React Modules
import { Fragment, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
// Mantine Modules
import { Stack } from "@mantine/core";
// Own Modules
import PanelNav from "@/layout/main/panel";

import { useMissedLogStore } from "./store/main";
import { MissedLogProvider, useMissedLogContext } from "./context";

function MissedLogContent() {
  const { missedLogTabs } = useMissedLogContext();
  const { activeTab, setActiveTab, setStoredPage, setStoredFilters, setSelectedRecords } = useMissedLogStore();

  useEffect(() => {
    setStoredFilters({});
    setStoredPage({});
    setSelectedRecords([]);
  }, [activeTab]);

  return (
    <Fragment>
      <title>Missed Log</title>
      <PanelNav>
        {missedLogTabs.map((item) => (
          <NavLink key={item.index} to={item.path} className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => setActiveTab(item.index)}>
            {item.label}
          </NavLink>
        ))}
      </PanelNav>
      <Stack className="bg-white m-4 mt-16 -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0 select-none">
        <Outlet />
      </Stack>
    </Fragment>
  );
}

export default function MissedLog() {
  return (
    <MissedLogProvider>
      <MissedLogContent />
    </MissedLogProvider>
  );
}
