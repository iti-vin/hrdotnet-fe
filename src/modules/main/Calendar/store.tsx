/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import dayjs from "dayjs";
import { create } from "zustand";

import { EventInput } from "@fullcalendar/core";

interface CalendarStoreI {
  date: string;

  setDate: (date: string) => void;
  calendarEvents: EventInput[];
  setCalendarEvents: (events: EventInput[]) => void;
  type: string;
  setType(type: string): void;
  loading: boolean;
  setLoading(load: boolean): void;
  dialog: string;
  setDialog(dialog: string): void;

  isRestDayShow: boolean;
  setIsRestDayShow(show: boolean): void;
  isHolidayShow: boolean;
  setIsHolidayShow(show: boolean): void;

  drawer: boolean;
  setDrawer(show: boolean): void;
}

export const useCalendarStore = create<CalendarStoreI>((set) => ({
  date: dayjs().format("YYYYMMDD"),
  setDate: (date: string) => set({ date: date }),
  calendarEvents: [],
  setCalendarEvents: (events) => set({ calendarEvents: events }),
  type: "",
  setType: (type: string) => set({ type: type }),
  loading: true,
  setLoading: (load: boolean) => set({ loading: load }),
  dialog: "",
  setDialog: (dialog: string) => set({ dialog: dialog }),

  isRestDayShow: true,
  setIsRestDayShow: (show: boolean) => set({ isRestDayShow: show }),
  isHolidayShow: true,
  setIsHolidayShow: (show: boolean) => set({ isHolidayShow: show }),

  drawer: false,
  setDrawer: (drawer: boolean) => set({ drawer: drawer }),
}));
