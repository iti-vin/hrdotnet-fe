/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext } from "react";
import { useCalendarStore } from "./store";
import apiService from "@/services/http";
import dayjs from "dayjs";
import { EventInput } from "@fullcalendar/core";
import { CalendarInterface } from "./assets/types";
import { Tab } from "@shared/assets/types/Global";

interface CalendarContextI {
  calendarTabs: Tab[];
  date: string;
  setDate: (date: string) => void;
  fetchCalendar: (date?: string) => Promise<any>;
}

const calendarTabs: Tab[] = [
  { index: 0, path: "personal", label: "Personal" },
  { index: 1, path: "team", label: "Team" },
];

const CalendarContext = createContext<CalendarContextI>({} as CalendarContextI);

export const CalendarProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { date, setDate, setCalendarEvents, isRestDayShow, isHolidayShow } = useCalendarStore();

  const fetchCalendar = useCallback(
    async (dateOverride?: string): Promise<void> => {
      const date = dateOverride ?? dayjs().format("YYYYMMDD");
      const params = { Date: date };

      let eventGuid = 0;
      const createEventId = () => {
        return String(eventGuid++);
      };

      const formatTime = (dateString: string): string => {
        return dayjs(dateString).format("hh:mm A");
      };

      const response = await apiService.get<CalendarInterface>("/calendar/me", { params });

      if (!response?.calendarDates) {
        setCalendarEvents([]);
        return;
      }

      const mappedEvents: EventInput[] = response.calendarDates.flatMap((data) =>
        data.entries
          .filter((entry) => isRestDayShow || !entry.isRestDay)
          .map((entry) => ({
            id: createEventId(),
            title: entry.isRestDay
              ? "Rest Day"
              : `${formatTime(entry.dateTimeRange.dateFrom)} - ${formatTime(entry.dateTimeRange.dateTo)}`,
            start: data.date,
            allDay: true,
            backgroundColor: entry.isRestDay ? "#9B51E0" : "#9B51E0",
          }))
      );

      // const holidayEvents: EventInput[] = response.calendarDates.flatMap((data) =>
      //   data.entries
      //     .filter(() => isHolidayShow)
      //     .map((entry) => ({
      //       id: createEventId(),
      //       title: entry.documentNo || "Holiday",
      //       start: entry.dateTimeRange.dateFrom,
      //       end: entry.dateTimeRange.dateTo,
      //       backgroundColor: "#FF4B34",
      //     }))
      // );

      // const obEvents: EventInput[] = response.calendarDates.flatMap((data) =>
      //   data.entries.map((entry) => ({
      //     id: createEventId(),
      //     title: entry.documentNo || "Official Business",
      //     start: entry.dateTimeRange.dateFrom,
      //     end: entry.dateTimeRange.dateTo,
      //     backgroundColor: "#2F78D1",
      //   }))
      // );

      // const leaveEvents: EventInput[] = response.calendarDates.flatMap((data) =>
      //   data.entries.map((entry) => ({
      //     id: createEventId(),
      //     title: entry.documentNo || "Leave Request",
      //     start: entry.dateTimeRange.dateFrom,
      //     end: entry.dateTimeRange.dateTo,
      //     backgroundColor: "#967BB6",
      //   }))
      // );

      // const testEvents: EventInput = {
      //   id: createEventId(),
      //   title: "Hersvin Day",
      //   start: "2025-04-15T08:00:00",
      //   end: "2025-04-17T08:00:00",
      //   backgroundColor: "orange",
      // };

      // const tryEvents: EventInput = {
      //   id: createEventId(),
      //   title: "Shift Schedule",
      //   start: "2025-04-20T08:00:00",
      //   end: "2025-04-22T08:00:00",
      //   backgroundColor: "green",
      // };

      setCalendarEvents([
        ...mappedEvents,
        // testEvents, tryEvents, ...holidayEvents, ...obEvents, ...leaveEvents
      ]);
    },
    [setCalendarEvents, isRestDayShow, isHolidayShow]
  );

  return (
    <CalendarContext.Provider value={{ calendarTabs, date, setDate, fetchCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = (): CalendarContextI => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendarContext must be used within a CalendarProvider");
  }

  return context;
};
