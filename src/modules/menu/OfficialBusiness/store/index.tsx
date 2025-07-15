/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { create } from "zustand";
import { OfficialBusinessItems, OfficialBusinessItemsValues } from "../models/response";

interface OfficialBusinessStoreI {
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
  viewItems: OfficialBusinessItems;
  setViewItems(items: OfficialBusinessItems): void;
  selectedRecords: OfficialBusinessItems[];
  setSelectedRecords(rec: OfficialBusinessItems[]): void;

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

  // Maintenance Module
  branchId: number;
  setBranchId(id: number): void;
  branches: { id: string; name: string; code: string }[];
  setBranches(branch: { id: string; name: string; code: string }[]): void;
  locations: { id: number; name: string; code: string }[];
  setLocations(loc: { id: number; name: string; code: string }[]): void;

  //--- Params
  storedFilters: Record<string, any>;
  setStoredFilters(filters: Record<string, any>): void;
  storedPage: Record<string, any>;
  setStoredPage(page: Record<string, any>): void;
}

export const useOfficialBusinessStore = create<OfficialBusinessStoreI>((set) => ({
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
  viewItems: OfficialBusinessItemsValues,
  setViewItems: (items: OfficialBusinessItems) => set({ viewItems: items }),
  selectedRecords: [],
  setSelectedRecords: (rec: OfficialBusinessItems[]) => set({ selectedRecords: rec }),

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

  // Maintenance Module
  branchId: 0,
  setBranchId: (id: number) => set({ branchId: id }),
  branches: [],
  setBranches: (type: { id: string; name: string; code: string }[]) => set({ branches: type }),
  locations: [],
  setLocations: (option: { id: number; name: string; code: string }[]) => set({ locations: option }),

  //--- Params
  storedFilters: {},
  setStoredFilters: (filter: Record<string, any>) => set({ storedFilters: filter }),
  storedPage: {},
  setStoredPage: (page: Record<string, any>) => set({ storedPage: page }),
}));
