/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import {
  DateRangeType,
  DateRangeTypeValues,
  LookUpResponse,
  LookUpResponseValues,
  Response,
  ResponseItem,
} from "@shared/assets/types/Global";

/**
 * @interface   OvertimeResponse
 */
export interface OvertimeResponse extends Response {
  items: OvertimeItems[];
}
export interface OvertimeItems extends ResponseItem {
  filing: OvertimeFilings;
}
export interface OvertimeFilings {
  id: number;
  guid: string;
  dateFiled: string;
  shiftSchedule: ShiftSchedule;
  documentNo: string;
  actual: DateRangeType;
  requested: DateRangeType;
  filingStatus: LookUpResponse;
  numberOfHours: number;
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
const OvertimeFilingsValue: OvertimeFilings = {
  id: 0,
  guid: "",
  dateFiled: "",
  shiftSchedule: ShiftScheduleValues,
  documentNo: "",
  actual: DateRangeTypeValues,
  requested: DateRangeTypeValues,
  filingStatus: LookUpResponseValues,
  numberOfHours: 0,
  reason: "",
  fileAttachment: "",
};
export const OvertimeItemsValue: OvertimeItems = {
  filing: OvertimeFilingsValue,
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  dateTransaction: "",
};
export const OfficialBusinessValues: OvertimeResponse = {
  items: [OvertimeItemsValue],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};

/**
 * @interface   TimeRecordsI
 */
export interface TimeRecordI {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  timeRecords: TimeRecords[];
  dateRequested: string;
}
interface TimeRecords {
  date: string;
  source: string;
}
const TimeRecordsValue: TimeRecords = {
  date: "",
  source: "",
};
export const TimeRecordValues: TimeRecordI = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  timeRecords: [TimeRecordsValue],
  dateRequested: "",
};

/**
 * @interface   MaintenanceSchedules
 */

export interface Schedules {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  schedule: {
    id: number;
    name: string;
    date: string;
    timeIn: string;
    timeOut: string;
    breakTimeIn: string;
    breakTimeOut: string;
    isPremium: boolean;
  };
  dateRequested: string;
}
