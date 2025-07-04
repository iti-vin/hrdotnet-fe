import { create } from "zustand";

export type FilterValues = {
  documentNo?: string;
  cosFrom?: string;
  cosTo?: string;
  schedule?: string;
  txnFrom?: string;
  txnTo?: string;
  processedBy?: string;
};

export type FilterKey = {
  "Doc No."?: string;
  "Transaction Date"?: string;
  Status?: string;
  "Processed By"?: string;
};

interface FilterStore {
  filters: FilterValues;
  setFilter: (key: keyof FilterValues, value: string) => void;
  removeFilter: (key: keyof FilterValues) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  removeFilter: (key) =>
    set((state) => {
      const updated = { ...state.filters };
      delete updated[key];
      return { filters: updated };
    }),
  clearFilters: () => set({ filters: {} }),
}));
