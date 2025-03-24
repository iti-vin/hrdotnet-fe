/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Module
import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
//--- Mantine Modules
import { Stack } from "@mantine/core";

//--- Layouts
import PanelNav from "@/layout/main/panel";

//--- Leave Modules
import "./assets/Styles.css";

//--- Leave Context
import { LeaveProvider, useLeave } from "./context";
import useLeaveStore from "./store/LeaveStore";

function LeaveContent() {
  const { activeTab, setActiveTab, leaveTabs, onFetchLeaveParameter, onFetchLeaveOption } = useLeave();
  const { setStoredFilters, setStoredPage, setDataFilter } = useLeaveStore();

  useEffect(() => {
    onFetchLeaveParameter();
    onFetchLeaveOption();
  }, []);

  useEffect(() => {
    setStoredFilters({});
    setStoredPage({});
    setDataFilter({ DocumentNo: null, LeaveType: null, DateField: null, DateFrom: null, DateTo: null, LeaveParameter: null });
  }, [activeTab]);

  return (
    <React.Fragment>
      <title>Leave</title>
      <PanelNav>
        {leaveTabs.map((item) => (
          <NavLink key={item.index} to={item.path} className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => setActiveTab(item.index)}>
            {item.label}
          </NavLink>
        ))}
      </PanelNav>
      {/* Consist of All Modals */}
      <Stack className="bg-white m-4 mt-16 -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0 select-none">
        <Outlet />
      </Stack>
    </React.Fragment>
  );
}

export default function Leave() {
  return (
    <LeaveProvider>
      <LeaveContent />
    </LeaveProvider>
  );
}
