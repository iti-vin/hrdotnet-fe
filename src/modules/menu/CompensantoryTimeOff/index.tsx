/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment } from "react";
import { Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

import PanelNav from "@/layout/main/panel";

import { CTOProvider, useCTOContext } from "./context";
import "./index.css";

function CTOContent() {
  const { ctoTabs } = useCTOContext();
  return (
    <Fragment>
      <title>Compensatory Time-Off</title>
      <Stack className="h-full">
        <PanelNav>
          {ctoTabs.map((item) => (
            <NavLink
              to={item.path}
              key={item.index}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              onClick={() => console.log(item.index)}>
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

export default function CTO() {
  return (
    <CTOProvider>
      <CTOContent />
    </CTOProvider>
  );
}
