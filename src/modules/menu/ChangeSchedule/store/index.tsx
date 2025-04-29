/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { create } from "zustand";
import { CosItems } from "../models/response";
import { Items, SchedulesValues } from "../assets/Values";
import { Schedules } from "../assets/Types";

interface CosInterface {
  // Modals
  openDialog: string;
  setOpenDialog(dialog: string): void;
  openAlert: string;
  setOpenAlert(dialog: string): void;
  openConfirmation: string;
  setOpenConfirmation(dialog: string): void;

  openDrawer: boolean;
  setOpenDrawer(drawer: boolean): void;

  // Data
  viewItems: CosItems;
  setViewItems(items: CosItems): void;
  singleItem: CosItems;
  setSingleItem(items: CosItems): void;
  selectedRecords: CosItems[];
  setSelectedRecords(rec: CosItems[]): void;

  // States
  activeTab: number;
  setActiveTab(tab: number): void;
  loading: boolean;
  setLoading(load: boolean): void;
  time: string;
  setTime(time: string): void;
  error: string;
  setError(err: string): void;
  warning: string;
  setWarning(war: string): void;
  success: string;
  setSuccess(suc: string): void;
  page: number;
  setPage(page: number): void;

  //--- Params
  storedFilters: Record<string, any>;
  setStoredFilters(filters: Record<string, any>): void;
  storedPage: Record<string, any>;
  setStoredPage(page: Record<string, any>): void;

  scheduleItems: Schedules;
  setScheduleItems(items: Schedules): void;

  schedList: { id: number; name: string; isRestDay: boolean }[];
  setSchedList: (items: { id: number; name: string; isRestDay: boolean }[]) => void;
}

export const useChangeOfScheduleStore = create<CosInterface>((set) => ({
  // Modals
  openDialog: "",
  setOpenDialog: (dialog: string) => set({ openDialog: dialog }),
  openAlert: "",
  setOpenAlert: (dialog: string) => set({ openAlert: dialog }),
  openConfirmation: "",
  setOpenConfirmation: (dialog: string) => set({ openConfirmation: dialog }),

  openDrawer: false,
  setOpenDrawer: (drawer: boolean) => set({ openDrawer: drawer }),

  // Data
  viewItems: Items,
  setViewItems: (items: CosItems) => set({ viewItems: items }),
  singleItem: Items,
  setSingleItem: (items: CosItems) => set({ singleItem: items }),
  selectedRecords: [],
  setSelectedRecords: (rec: CosItems[]) => set({ selectedRecords: rec }),

  // States
  activeTab: 0,
  setActiveTab: (tab: number) => set({ activeTab: tab }),
  loading: false,
  setLoading: (load: boolean) => set({ loading: load }),
  time: "",
  setTime: (time: string) => set({ time: time }),
  error: "",
  setError: (err: string) => set({ error: err }),
  warning: "",
  setWarning: (war: string) => set({ warning: war }),
  success: "",
  setSuccess: (suc: string) => set({ success: suc }),
  page: 1,
  setPage: (page: number) => set({ page: page }),

  //--- Params
  storedFilters: {},
  setStoredFilters: (filter: Record<string, any>) => set({ storedFilters: filter }),
  storedPage: [],
  setStoredPage: (page: Record<string, any>) => set({ storedPage: page }),

  scheduleItems: SchedulesValues,
  setScheduleItems: (items: Schedules) => set({ scheduleItems: items }),
  schedList: [],
  setSchedList: (items: { id: number; name: string; isRestDay: boolean }[]) => set({ schedList: items }),
}));
