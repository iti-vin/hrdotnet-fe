import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  warning: boolean;
  body: string;
  width?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  openModal: (config: Omit<ModalState, "isOpen" | "openModal" | "closeModal"> & { duration?: number }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  body: "",
  warning: false,
  openModal: (config) => {
    const { duration, ...rest } = config;
    set({ ...rest, isOpen: true });

    if (duration) {
      setTimeout(() => {
        set({ isOpen: false });
      }, duration);
    }
  },
  closeModal: () => set({ isOpen: false }),
}));
