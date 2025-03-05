/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 * @file       Overtime Data Types
 */

import { DateRangeType, LookUpResponse } from "@shared/assets/types/Global";

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
  actual: DateRangeType;
  requested: DateRangeType;
  dateTransaction: string;
  filingStatus: LookUpResponse;
  numberOfHours: number;
  reason: string;
  fileAttachment: string;
};

const Actual: DateRangeType = {
  dateFrom: "",
  dateTo: "",
};

const Requested: DateRangeType = {
  dateFrom: "",
  dateTo: "",
};

const FilingStatus: LookUpResponse = {
  id: 0,
  name: "",
};

const Filing: Filing = {
  id: 0,
  guid: "",
  dateFiled: "",
  shiftSchedule: undefined,
  documentNo: "",
  actual: Actual,
  requested: Requested,
  dateTransaction: "",
  filingStatus: FilingStatus,
  numberOfHours: 0,
  reason: "",
  fileAttachment: "",
};

export const InitialItems: Items = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  filing: Filing,
  dateTransaction: "",
};

export const InitialOvertime: Overtime = {
  items: [InitialItems],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};
