/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 * @file       Overtime Data Types
 */

export type Overtime = {
  items: Items[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Items = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: Filing;
  dateTransaction: string;
};

type Filing = {
  id: number;
  guid: string;
  dateFiled: string;
  shiftSchedule: unknown;
  documentNo: string;
  actual: Actual;
  requested: Requested;
  dateTransaction: string;
  filingStatus: FilingStatus;
  numberOfHours: number;
  reason: string;
  fileAttachment: string;
};

type Actual = {
  dateFrom: string;
  dateTo: string;
};

type Requested = {
  dateFrom: string;
  dateTo: string;
};

type FilingStatus = {
  id: number;
  name: string;
};

const ActualI: Actual = {
  dateFrom: "",
  dateTo: "",
};

const RequestedI: Requested = {
  dateFrom: "",
  dateTo: "",
};

const FilingStatusI: FilingStatus = {
  id: 0,
  name: "",
};

const FilingI: Filing = {
  id: 0,
  guid: "",
  dateFiled: "",
  shiftSchedule: undefined,
  documentNo: "",
  actual: ActualI,
  requested: RequestedI,
  dateTransaction: "",
  filingStatus: FilingStatusI,
  numberOfHours: 0,
  reason: "",
  fileAttachment: "",
};

export const ItemsI: Items = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  filing: FilingI,
  dateTransaction: "",
};

export const OvertimeI: Overtime = {
  items: [ItemsI],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};

export type OTMainTypes = {
  tabs: "List" | "Review" | "Approve";
  statusArray: ("Approved" | "Cancelled" | "Reviewed" | "Filed" | "Posted")[];
  statusList: "Approved" | "Cancelled" | "Reviewed" | "Filed" | "Posted";
};
