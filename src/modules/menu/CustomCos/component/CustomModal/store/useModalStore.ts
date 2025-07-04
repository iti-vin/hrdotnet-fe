import { create } from "zustand";

type ModalType = "info" | "warning" | "success" | "error";

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  width?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  openModal: (config: Omit<ModalState, "isOpen" | "openModal" | "closeModal">) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: "info",
  title: "",
  subtitle: "",
  content: null,
  footer: null,
  width: "md",
  openModal: (config) => set({ ...config, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
