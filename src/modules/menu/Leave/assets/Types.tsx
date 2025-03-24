import { DateRangeType, LookUpResponse } from "@shared/assets/types/Global";

export type LeaveType = {
  items: LeaveItems;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type LeaveItems = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  dateTransaction: string;
  filing: LeaveFiling;
};

type LeaveFiling = {
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
};
