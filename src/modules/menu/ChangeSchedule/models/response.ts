/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { DateRangeType, LookUpResponse } from "@shared/assets/types/Global";

export interface ChangeSchedule {
  items: CosItems[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface CosItems {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: Filings;
  dateTransaction: string;
}

interface Filings {
  id: number;
  guid: string;
  requested: Requested;
  documentNo: string;
  dateFiled: DateRangeType;
  dateTransaction: string;
  filingStatus: LookUpResponse;
  reason: string;
  fileAttachment: string;
}

interface Requested extends LookUpResponse {
  isRestDay: boolean;
}

export interface Schedules {
  items: [
    {
      id: number;
      code: string;
      guid: string;
      name: string;
      description: string;
      timeIn: string;
      timeOut: string;
      breakIn: string;
      breakOut: string;
      shiftType: {
        id: number;
        name: string;
      };
      shiftHours: number;
      isRestDay: boolean;
    }
  ];
}
