/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
//--- Mantine Modules
import { Stack } from "@mantine/core";

//--- Shared Components
import PanelNav from "@/layout/main/panel";
//--- Change Schedule Context
import { CosProvider, useChangeOfSchedule } from "./context";

function COSContent() {
  const { cosTabs, setActiveTab } = useChangeOfSchedule();

  return (
    <React.Fragment>
      <title>Change of Schedule</title>
      <Stack className="h-full">
        <PanelNav>
          {cosTabs.map((item) => (
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
    </React.Fragment>
  );
}

export default function COS() {
  return (
    <CosProvider>
      <COSContent />
    </CosProvider>
  );
}
