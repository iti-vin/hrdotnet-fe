import { create } from "zustand";
import data from "@shared/services/offset.json";
type OffsetItem = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: {
    id: number;
    guid: string;
    dateFiled: string;
    documentNo: string;
    actual: {
      dateFrom: string;
      dateTo: string;
    };
    filingStatus: {
      id: number;
      name: string;
    };
    totalCredits: number;
    usedCredits: number;
    currentCredits: number;
    reason: string;
    dateTransaction: string;
  };
  dateTransaction: string;
};

interface OffsetProps {
  items: OffsetItem[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  setSelectedData?: (selected_items: OffsetItem[]) => void;
  selectedData?: OffsetItem[];
}

const useOffsetStore = create<OffsetProps>(() => ({
  items: data.items,
  page: data.page,
  pageSize: data.pageSize,
  pageCount: data.pageCount,
  total: data.total,
}));

export default useOffsetStore;
