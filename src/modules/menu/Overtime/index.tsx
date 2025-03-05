import { NavLink, Outlet } from "react-router-dom";
import { useLogoWidth } from "@shared/hooks/useWidth";
import "./index.css";
import Dialog from "./components/Dialog";
import React from "react";
import { Stack } from "@mantine/core";

const overtimeTabs = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

export const Overtime = () => {
  const { isLogowordVisible } = useLogoWidth();

  return (
    <React.Fragment>
      <title>Overtime</title>
      <div className={`panel-container ${isLogowordVisible ? "sm:pl-0 md:pl-5 lg:pl-265" : "pl-23"}`}>
        {overtimeTabs.map((item) => (
          <NavLink to={item.path} key={item.index} className={({ isActive }) => (isActive ? "active" : "inactive")}>
            {item.label}
          </NavLink>
        ))}
      </div>
      <Stack className="bg-white m-4 mt-16 -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
        <Outlet />
        <Dialog />
      </Stack>
    </React.Fragment>
  );
};
