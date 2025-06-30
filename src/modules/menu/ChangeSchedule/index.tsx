/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
//--- Mantine Modules
import { Stack } from "@mantine/core";

//--- Shared Components
import PanelNav from "@/layout/main/panel";
//--- Change Schedule Context
import { CosProvider, useChangeOfScheduleContext } from "./context";
import { useChangeOfScheduleStore } from "./store";

function COSContent() {
  const { cosTabs, fetchScheduleItems } = useChangeOfScheduleContext();
  const { activeTab, setActiveTab, setStoredFilters, setStoredPage, setSelectedRecords } = useChangeOfScheduleStore();

  useEffect(() => {
    fetchScheduleItems();
    setSelectedRecords([]);
    setStoredFilters([]);
    setStoredPage([]);
  }, [activeTab]);

  return (
    <Stack className="h-full">
      <title>Change of Schedule</title>
      <PanelNav>
        {cosTabs.map((item) => (
          <NavLink key={item.index} to={item.path} className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => setActiveTab(item.index)}>
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

export default function COS() {
  return (
    <CosProvider>
      <COSContent />
    </CosProvider>
  );
}
