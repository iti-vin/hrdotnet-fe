import { create } from "zustand";

interface GlobalInterface {
  twoDate: [Date | null, Date | null];
  setTwoDate(date: [Date | null, Date | null]): void;
}

export const useGlobalStore = create<GlobalInterface>((set) => ({
  twoDate: [null, null],
  setTwoDate: (date: [Date | null, Date | null]) => set({ twoDate: date }),
}));
