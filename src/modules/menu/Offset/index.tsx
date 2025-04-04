/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment } from "react";
import { Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

import PanelNav from "@/layout/main/panel";

import { OffsetProvider, useOffsetContext } from "./context";
import "./index.css";

function OffsetContent() {
  const { offsetTabs } = useOffsetContext();
  return (
    <Fragment>
      <title>Offset</title>
      <PanelNav>
        {offsetTabs.map((item) => (
          <NavLink
            to={item.path}
            key={item.index}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            onClick={() => console.log(item.index)}>
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

export default function Offset() {
  return (
    <OffsetProvider>
      <OffsetContent />
    </OffsetProvider>
  );
}
