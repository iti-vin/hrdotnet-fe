/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
import { DateRangeType, LookUpResponse } from "@shared/assets/types/Global";

export interface CalendarInterface {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  calendarDates: CalendarDates[];
  dateTransaction: string;
}

export interface CalendarDates {
  date: string;
  entries: Entries[];
}

interface Entries {
  documentNo: string;
  dateTimeRange: DateRangeType;
  filingStatus: LookUpResponse;
  source: string;
  isRestDay: true;
}

export interface OvertimeResponse extends Response {
  items: OvertimeItems[];
}
export interface OvertimeItems<T = unknown> {
  filing: Filings & T;
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  dateTransaction: string;
}
interface Filings {
  id: number;
  guid: string;
  documentNo: string;
  reason: string;
  fileAttachment: string;
  filingStatus: { id: number; name: string };
}

export interface GeneralInfoI {
  // OFFICIAL BUSINESS
  OB: Filings & {
    dateRange: {
      dateFrom: string;
      dateTo: string;
    };
    timeRange: {
      timeIn: string;
      timeOut: string;
    };
    location: {
      id: number;
      name: string;
      locationBranchId: number;
      locationBranch: string;
    };
  };
  // OVERTIME
  OT: Filings & OTOFFI;
  // OFFSET
  OFF: Filings &
    OTOFFI & {
      totalCredits: number;
      usedCredits: number;
      currentCredits: number;
    };
  // CHANGE OF SCHEDULE
  COS: Filings & {
    dateFiled: { dateFrom: string; dateTo: string };
    requested: {
      id: number;
      name: string;
      isRestDay: boolean;
    };
  };
  // LEAVE
  LV: Filings & {
    dateFiled: { dateFrom: string; dateTo: string };
    leaveParameter: {
      id: number;
      name: string;
    };
    leaveOption: { id: number; name: string; type: string; amount: string };
    numberOfDays: number;
  };
  // MISSED LOG
  ML: Filings & {
    timeInOut: string;
    dateFiled: string | null;
    logType: { id: number; name: string };
  };
  // COMPENSATORY TIME OFF
  //   cto: {};
}

interface OTOFFI {
  actual: {
    dateFrom: string;
    dateTo: string;
  };
  requested: {
    dateFrom: string;
    dateTo: string;
  };
  dateFiled: string;

  shiftSchedule: {
    id: number;
    name: string;
    date: string;
    timeIn: string;
    timeOut: string;
    breakTimeIn: string;
    breakTimeOut: string;
    isPremium: boolean;
  };
  numberOfHours: number;
}
