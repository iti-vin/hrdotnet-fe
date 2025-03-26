/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { create } from "zustand";
import { MissedLogItems, MissedLogItemsInitialValue } from "../models/response";

interface MissedLogStoreInterface {
  //--- States
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
  showDrawer: boolean;
  setShowDrawer(drawer: boolean): void;

  dateFiled: Date | null;
  setDateFiled(date: Date | null): void;

  //--- Modals
  openDialog: string;
  setOpenDialog(dialog: string): void;
  openConfirmation: string;
  setOpenConfirmation(confirm: string): void;
  openAlert: string;
  setOpenAlert(alert: string): void;

  //--- Data
  selectedRecords: MissedLogItems[];
  setSelectedRecords(data: MissedLogItems[]): void;
  viewItems: MissedLogItems;
  setViewItems(items: MissedLogItems): void;

  //--- Params
  storedFilters: Record<string, any>;
  setStoredFilters(filters: Record<string, any>): void;
  storedPage: Record<string, any>;
  setStoredPage(page: Record<string, any>): void;
}

export const useMissedLogStore = create<MissedLogStoreInterface>((set) => ({
  //--- States
  activeTab: 0,
  setActiveTab: (tab: number) => set({ activeTab: tab }),
  loading: true,
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
  showDrawer: false,
  setShowDrawer: (drawer: boolean) => set({ showDrawer: drawer }),

  dateFiled: new Date(),
  setDateFiled: (date: Date | null) => set({ dateFiled: date }),

  // Modals
  openDialog: "",
  setOpenDialog: (dialog: string) => set({ openDialog: dialog }),
  openConfirmation: "",
  setOpenConfirmation: (confirm: string) => set({ openConfirmation: confirm }),
  openAlert: "",
  setOpenAlert: (alert: string) => set({ openAlert: alert }),

  //--- Data
  selectedRecords: [],
  setSelectedRecords: (records: MissedLogItems[]) => set({ selectedRecords: records }),
  viewItems: MissedLogItemsInitialValue,
  setViewItems: (items: MissedLogItems) => set({ viewItems: items }),

  //--- Params
  storedFilters: {},
  setStoredFilters: (filter: Record<string, any>) => set({ storedFilters: filter }),
  storedPage: {},
  setStoredPage: (page: Record<string, any>) => set({ storedPage: page }),
}));
