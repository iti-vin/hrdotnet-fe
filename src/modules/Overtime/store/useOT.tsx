import { create } from "zustand";
//--- Types
import { Items } from "@/modules/Overtime/assets/types";
import { Tabs, FilingStatus } from "@shared/assets/types/Global";
//--- Sample Data
import data from "@shared/services/overtime.json";

interface OvertimeProps {
  items: Items[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  selectedData: any;
  activeTab: string;
  alert: string;
  action: string;

  setSelectedData: (selected_items: any) => void;
  setActiveTab: (activeTab: string) => void;
  setAlert: (alert: string) => void;
  setAction: (action: string) => void;
}

const useOvertimeStore = create<OvertimeProps>((set) => ({
  items: data.items,
  page: data.page,
  pageSize: data.pageSize,
  pageCount: data.pageCount,
  total: data.total,
  selectedData: {},
  activeTab: '',
  alert: '',
  action: '',

  setActiveTab: (activeTab) => set({ activeTab: activeTab }),
  setSelectedData: (selected_items) => set({ selectedData: selected_items }),
  setAlert: (alert) => set({ alert: alert }),
  setAction: (action) => set({ action: action }),
}));

interface AccessProps {
  notAllowed: boolean;
  tabs: Tabs;
  statuses: FilingStatus[];

  setTabs: (tabs: Tabs) => void;
  setStatuses: (status: FilingStatus[]) => void;
}

const useAccess = create<AccessProps>((set) => ({
  notAllowed: true,
  tabs: Tabs.List,
  statuses: [],

  setTabs: (tabs: Tabs) => set({ tabs: tabs }),
  setStatuses: (status: FilingStatus[]) => set({ statuses: status }),
}));

export { useOvertimeStore, useAccess };
