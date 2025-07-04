import { create } from "zustand";

interface PaginationState {
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (value: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  rowsPerPage: 10,
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage, page: 1 }),
}));
