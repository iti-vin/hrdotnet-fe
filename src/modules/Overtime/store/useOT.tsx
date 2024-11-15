import { create } from "zustand";
//--- Types
import { Items, OTMainTypes } from "@/modules/Overtime/assets/types";
//--- Sample Data
import data from "@shared/services/overtime.json";

interface OvertimeProps {
  items: Items[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  setSelectedData: (selected_items: any) => void;
  selectedData: any;
}

const useOvertimeStore = create<OvertimeProps>((set) => ({
  items: data.items,
  page: data.page,
  pageSize: data.pageSize,
  pageCount: data.pageCount,
  total: data.total,
  selectedData: {},

  setSelectedData: (selected_items) => set({ selectedData: selected_items }),
}));

interface AccessProps {
  notAllowed: boolean;
  tabs: OTMainTypes["tabs"];
  statuses: OTMainTypes["statusArray"];

  setTabs: (tabs: OTMainTypes["tabs"]) => void;
  setStatuses: (status: OTMainTypes["statusArray"]) => void;
}

const useAccess = create<AccessProps>((set) => ({
  notAllowed: true,
  tabs: "List",
  statuses: [],

  setTabs: (tabs: OTMainTypes["tabs"]) => set({ tabs: tabs }),
  setStatuses: (status: OTMainTypes["statusArray"]) =>
    set({ statuses: status }),
}));

export { useOvertimeStore, useAccess };
