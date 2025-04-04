import {
  DateRangeType,
  DateRangeTypeValues,
  LookUpResponse,
  LookUpResponseValues,
  Response,
  ResponseItem,
} from "@shared/assets/types/Global";

/**
 * @interface   OffsetResponse
 */
export interface OffsetResponse extends Response {
  items: OffsetItems[];
}
export interface OffsetItems extends ResponseItem {
  filing: OffsetFilings;
}
export interface OffsetFilings {
  id: number;
  guid: string;
  dateFiled: string;
  shiftSchedule: ShiftSchedule;
  documentNo: string;
  actual: DateRangeType;
  requested: DateRangeType;
  filingStatus: LookUpResponse;
  totalCredits: number;
  usedCredits: number;
  currentCredits: number;
  reason: string;
  fileAttachment: string;
}
interface ShiftSchedule extends LookUpResponse {
  date: string;
  timeIn: string;
  timeOut: string;
  breakTimeIn: string;
  breakTimeOut: string;
  isPremium: boolean;
}

const ShiftScheduleValues: ShiftSchedule = {
  id: 0,
  name: "",
  date: "",
  timeIn: "",
  timeOut: "",
  breakTimeIn: "",
  breakTimeOut: "",
  isPremium: false,
};
const OffsetFilingsValue: OffsetFilings = {
  id: 0,
  guid: "",
  dateFiled: "",
  shiftSchedule: ShiftScheduleValues,
  documentNo: "",
  actual: DateRangeTypeValues,
  requested: DateRangeTypeValues,
  filingStatus: LookUpResponseValues,
  totalCredits: 0,
  usedCredits: 0,
  currentCredits: 0,
  reason: "",
  fileAttachment: "",
};
export const OffsetItemsValue: OffsetItems = {
  filing: OffsetFilingsValue,
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  dateTransaction: "",
};
export const OfficialBusinessValues: OffsetResponse = {
  items: [OffsetItemsValue],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};
