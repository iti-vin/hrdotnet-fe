import { create } from "zustand";

export interface FilingStatus {
  id: number;
  name: string;
}

export interface Requested {
  id: number;
  name: string;
  isRestDay: boolean;
}

export interface DateFiled {
  dateFrom: string;
  dateTo: string;
}

export interface FilingDetails {
  id: number;
  guid: string;
  requested: Requested;
  documentNo: string;
  dateFiled: DateFiled;
  dateTransaction: string;
  filingStatus: FilingStatus;
  reason: string;
  fileAttachment: string;
}

export interface Filing {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: FilingDetails;
  dateTransaction: string;
}

interface FilingStore {
  filings: Filing[];
  setFilings: (data: Filing[]) => void;
}

export const useFilingStore = create<FilingStore>((set) => ({
  filings: [],
  setFilings: (data) => set({ filings: data }),
}));
