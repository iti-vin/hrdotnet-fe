import { create } from "zustand";
import data from "@shared/services/offset.json";
import { Items } from "@/modules/menu/Offset/assets/types";
interface OffsetProps {
  items: Items[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  selectedData: any;
  activeTab: string;

  setActiveTab: (activeTab: string) => void;
  setSelectedData: (selected_items: any) => void;
}

const useOffsetStore = create<OffsetProps>((set) => ({
  items: data.items,
  page: data.page,
  pageSize: data.pageSize,
  pageCount: data.pageCount,
  total: data.total,
  selectedData: {},
  activeTab: "",

  setActiveTab: (activeTab) => set({ activeTab: activeTab }),
  setSelectedData: (selected_items) => set({ selectedData: selected_items }),
}));

export default useOffsetStore;
