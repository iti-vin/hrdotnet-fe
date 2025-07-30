import PanelNav from "@/layout/main/panel";
import { Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { CalendarProvider, useCalendarContext } from "./context";
import "./index.css";

function CalendarContent() {
  const { calendarTabs } = useCalendarContext();
  return (
    <Stack className="h-full">
      <title>Calendar</title>
      <Stack className="h-full">
        <PanelNav>
          {calendarTabs.map((item) => (
            <NavLink to={item.path} key={item.index} className={({ isActive }) => (isActive ? "active" : "inactive")}>
              {item.label}
            </NavLink>
          ))}
        </PanelNav>
        <Stack className="h-full mx-4 mb-3 overflow-hidden">
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function Calendar() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}
