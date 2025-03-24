import { DateRangeTypeValues, LookUpResponseValues } from "@shared/assets/types/Global";
import { LeaveItems, LeaveType } from "./Types";

const LeaveFiling = {
  id: 0,
  guid: "",
  documentNo: "",
  dateFiled: DateRangeTypeValues,
  leaveParameter: LookUpResponseValues,
  leaveOption: {
    ...LookUpResponseValues,
    type: "",
    amount: "",
  },
  numberOfDays: 0,
  dateTransaction: "",
  filingStatus: LookUpResponseValues,
  referenceNo: "",
  reason: "",
  fileAttachment: "",
};

export const LeaveItemsValues: LeaveItems = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  dateTransaction: "",
  filing: LeaveFiling,
};

export const LeaveValues: LeaveType = {
  items: LeaveItemsValues,
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};
