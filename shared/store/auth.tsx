// store/useJwtStore.ts
import { JwtPayloadMain } from "@shared/assets/types/jwt";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JwtPayload extends JwtPayloadMain {
  IsASystemAccount: boolean;
  IsBranchFilter: boolean;
  IsDepartmentFilter: boolean;
  CanViewSalary: boolean;
  CanViewAllEmployeeRecord: boolean;
  CanEditJobInformation: boolean;
  CanEditPayrollInformation: boolean;
  CanApprove: boolean;
  CanReview: boolean;
}

interface JwtStore {
  token: string | null;
  jwt: JwtPayload | null;
  setToken: (payload: string) => void;
  setJwt: (payload: JwtPayload) => void;
  clear: () => void;
}

export const useAuthGlobalStore = create<JwtStore>()(
  persist(
    (set) => ({
      token: null,
      jwt: null,
      setToken: (payload) => set({ token: payload }),
      setJwt: (payload) => set({ jwt: payload }),
      clear: () => set({ jwt: null, token: null }),
    }),
    {
      name: "authToken",
    }
  )
);
