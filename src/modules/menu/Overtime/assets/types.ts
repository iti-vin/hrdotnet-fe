export interface PaginationI {
  total: number;
  pageSize: number;
  recordsLength: number;
  time: string;
  currentPage: number;
}

export interface HeaderButtonProps {
  normalBtn: { label: string; icon?: React.ReactNode; onClick: () => void };
  popoverBtn: { label: string; icon: React.ReactNode; innerLabel?: string; fOnClick: () => void; sOnClick: () => void };
}

export interface Batch {
  filings: BatchFilings[];
}
interface BatchFilings {
  recordId: number;
  employeeId: number;
  companyId: number;
  documentNo: string;
}

export type ValidationErrorResponse = {
  type: string;
  title: string;
  status: number;
  errors: Record<string, string[]>; // Dynamic keys with an array of error messages
  traceId: string;
};
