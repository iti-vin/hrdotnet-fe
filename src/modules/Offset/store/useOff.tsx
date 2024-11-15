import { create } from "zustand";
import data from "@shared/services/offset.json";
import { Items } from "@/modules/Offset/assets/types";
interface OffsetProps {
  items: Items[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  setSelectedData?: (selected_items: Items[]) => void;
  selectedData?: any;
}

const useOffsetStore = create<OffsetProps>((set) => ({
  items: data.items,
  page: data.page,
  pageSize: data.pageSize,
  pageCount: data.pageCount,
  total: data.total,
  selectedData: {},

  setSelectedData: (selected_items: Items[]) =>
    set({ selectedData: selected_items }),
}));

export default useOffsetStore;
