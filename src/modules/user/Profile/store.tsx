/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { create } from "zustand";

interface ProfileInterface {
  openModal: string;
  setOpenModal(open: string): void;
}

export const useProfileStore = create<ProfileInterface>((set) => ({
  openModal: "",
  setOpenModal: (open: string) => set({ openModal: open }),
}));
