import { DateRangeType, LookUpResponse, Response, ResponseItem } from "@shared/assets/types/Global";

export interface LeaveResponse extends Response {
  items: LeaveItems[];
}

export interface LeaveItems extends ResponseItem {
  filing: LeaveFiling;
}

interface LeaveFiling {
  id: number;
  guid: string;
  documentNo: string;
  dateFiled: DateRangeType;
  leaveParameter: LookUpResponse;
  leaveOption: LookUpResponse & {
    type: string;
    amount: string;
  };
  numberOfDays: number;
  dateTransaction: string;
  filingStatus: LookUpResponse;
  referenceNo: string;
  reason: string;
  fileAttachment: string;
}

export interface LeaveOptionsParameter extends Response {
  items: LeaveLedgerItems[];
}

interface LeaveLedgerItems {
  id: number;
  code: string;
  guid: string;
  name: string;
  description: string;
  amount: string;
}

export interface LeaveLedgerResponse {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  entries: Entries[];
  dateTransaction: string;
}

interface Entries {
  id: number;
  guid: string;
  leaveParameter: LookUpResponse;
  dateTransaction: string;
  source: string;
  documentNo: string;
  debit: number;
  credit: number;
  particulars: string;
  businessYear: string;
}
