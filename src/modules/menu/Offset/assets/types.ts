/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 * @file       Offset Data Types
 */

import { DateRangeType, LookUpResponse } from "@shared/assets/types/Global";

export type Offset = {
  items: [];
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
  totalCredits: number;
  usedCredits: number;
  currentCredits: number;
  reason: string;
  fileAttachment: string;
};
