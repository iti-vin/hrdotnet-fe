import { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  content?: ReactNode;
  footer?: ReactNode;
  width?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  openModal: (config: Omit<ModalState, "isOpen" | "openModal" | "closeModal">) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  footer: null,
  width: "md",
  openModal: (config) => set({ ...config, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
