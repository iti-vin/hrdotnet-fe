import { create } from "zustand";
import { ReactNode } from "react";

interface DrawerConfig {
  title: string;
  content?: ReactNode;
  footer?: ReactNode;
  width?: string | number;
}

interface DrawerState extends DrawerConfig {
  isOpen: boolean;
  openDrawer: (config: DrawerConfig) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  footer: null,
  width: "md",
  openDrawer: (config) => set({ ...config, isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}));
