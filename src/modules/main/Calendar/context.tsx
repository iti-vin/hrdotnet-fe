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

      console.log(response.calendarDates);

      const mappedEvents: EventInput[] = response.calendarDates.flatMap((data) =>
        data.entries
          .filter((entry) => isRestDayShow || !entry.isRestDay)
          .map((entry) => ({
            id: createEventId(),
            title: entry.isRestDay ? "Rest Day" : `${formatTime(entry.dateTimeRange.dateFrom)} - ${formatTime(entry.dateTimeRange.dateTo)}`,
            start: data.date,
            allDay: true,
            borderColor: entry.isRestDay ? "#D4D4D4" : "#FFD8B0",
            textColor: entry.isRestDay ? "#A3A3A3" : "#ED8028",
            backgroundColor: entry.isRestDay ? "#F7F7F7" : "#FFF2E6",
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

      const obEvents: EventInput[] = response.calendarDates.flatMap((data) =>
        data.entries.map((entry) => ({
          id: createEventId(),
          title: entry.documentNo || "Official Business",
          start: entry.dateTimeRange.dateFrom,
          end: entry.dateTimeRange.dateTo,
          borderColor: "#B7DAF4",
          textColor: "#559CDA",
          backgroundColor: "#F0F8FE",
        }))
      );

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
      //   start: "2025-07-29T08:00:00",
      //   end: "2025-07-29T20:00:00",
      //   borderColor: "#D3E8C3",
      //   textColor: "#5A9D27",
      //   backgroundColor: "#F3FAEB",
      // };

      // const sampleLogs: EventInput = {
      //   id: createEventId(),
      //   title: "07:45 AM - 06:30 PM",
      //   start: "2025-07-29T08:00:00",
      //   end: "2025-07-29T20:00:00",
      //   borderColor: "#B7DAF4",
      //   textColor: "#559CDA",
      //   backgroundColor: "#F0F8FE",
      // };

      setCalendarEvents([
        ...mappedEvents,
        ...obEvents,
        // testEvents, tryEvents, ...holidayEvents, ...obEvents, ...leaveEvents
      ]);
    },
    [setCalendarEvents, isRestDayShow, isHolidayShow]
  );

  return <CalendarContext.Provider value={{ calendarTabs, date, setDate, fetchCalendar }}>{children}</CalendarContext.Provider>;
};

export const useCalendarContext = (): CalendarContextI => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendarContext must be used within a CalendarProvider");
  }

  return context;
};
