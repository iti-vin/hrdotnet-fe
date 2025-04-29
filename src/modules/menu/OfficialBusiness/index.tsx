/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useEffect } from "react";

import { OfficialBusinessProvider, useOfficialBusinessContext } from "./context";
import PanelNav from "@/layout/main/panel";
import { NavLink, Outlet } from "react-router-dom";
import { Stack } from "@mantine/core";

import { useOfficialBusinessStore } from "./store";

function OfficialBusinessContent() {
  const { activeTab, setActiveTab, officialBusinessTabs, onFetchMaintenanceLocation } = useOfficialBusinessContext();
  const { setSelectedRecords, setStoredFilters, setStoredPage } = useOfficialBusinessStore();

  useEffect(() => {
    onFetchMaintenanceLocation();
    setSelectedRecords([]);
    setStoredFilters([]);
    setStoredPage([]);
  }, [activeTab]);

  return (
    <Fragment>
      <title>Official Business</title>
      <Stack className="h-full">
        <PanelNav>
          {officialBusinessTabs.map((item) => (
            <NavLink
              key={item.index}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              onClick={() => setActiveTab(item.index)}>
              {item.label}
            </NavLink>
          ))}
        </PanelNav>
        <Stack className="h-full bg-white mx-4 mt-16 p-8 rounded-lg select-none">
          <Outlet />
        </Stack>
      </Stack>
    </Fragment>
  );
}

export default function OfficialBusiness() {
  return (
    <OfficialBusinessProvider>
      <OfficialBusinessContent />
    </OfficialBusinessProvider>
  );
}
