/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { create } from "zustand";
import { OffsetItems, OffsetItemsValue } from "../models/response";

interface OvertimeStoreInterface {
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
  viewItems: OffsetItems;
  setViewItems(items: OffsetItems): void;
  singleItem: OffsetItems;
  setSingleItem(items: OffsetItems): void;
  selectedRecords: OffsetItems[];
  setSelectedRecords(rec: OffsetItems[]): void;

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

  schedules: {
    id: string;
    name: string;
    date: string;
    timeIn: string;
    timeOut: string;
    breakIn: string;
    breakOut: string;
  }[];
  setSchedules(
    schedules: {
      id: string;
      name: string;
      date: string;
      timeIn: string;
      timeOut: string;
      breakIn: string;
      breakOut: string;
    }[]
  ): void;
}

export const useOffsetStore = create<OvertimeStoreInterface>((set) => ({
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
  viewItems: OffsetItemsValue,
  setViewItems: (items: OffsetItems) => set({ viewItems: items }),
  singleItem: OffsetItemsValue,
  setSingleItem: (items: OffsetItems) => set({ singleItem: items }),
  selectedRecords: [],
  setSelectedRecords: (rec: OffsetItems[]) => set({ selectedRecords: rec }),

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

  schedules: [],
  setSchedules: (
    schedules: {
      id: string;
      name: string;
      date: string;
      timeIn: string;
      timeOut: string;
      breakIn: string;
      breakOut: string;
    }[]
  ) => set({ schedules: schedules }),
}));
