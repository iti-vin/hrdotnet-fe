// store/useJwtStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JwtPayload {
  jti: string;
  sub: string;
  UserId: string;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: string;
  BranchId: string;
  DepartmentId: string;
  PositionId: string;
  UserGroupId: string;
  IsASystemAccount: boolean;
  IsBranchFilter: boolean;
  IsDepartmentFilter: boolean;
  CanViewSalary: boolean;
  CanViewAllEmployeeRecord: boolean;
  CanEditJobInformation: boolean;
  CanEditPayrollInformation: boolean;
  CanApprove: boolean;
  CanReview: boolean;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
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
