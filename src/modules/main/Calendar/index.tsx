import PanelNav from "@/layout/main/panel";
import { Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { CalendarProvider, useCalendarContext } from "./context";
import "./index.css";

function CalendarContent() {
  const { calendarTabs } = useCalendarContext();
  return (
    <Fragment>
      <title>Calendar</title>
      <Stack className="h-full">
        <PanelNav>
          {calendarTabs.map((item) => (
            <NavLink to={item.path} key={item.index} className={({ isActive }) => (isActive ? "active" : "inactive")}>
              {item.label}
            </NavLink>
          ))}
        </PanelNav>
        <Stack className="h-[92%] bg-white mx-4 mt-16 p-8 rounded-lg select-none">
          <Outlet />
        </Stack>
      </Stack>
    </Fragment>
  );
}

export default function Calendar() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}
