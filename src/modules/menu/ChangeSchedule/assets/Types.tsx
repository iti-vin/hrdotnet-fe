/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Shared Types
import { DateRangeType, LookUpResponse } from "@shared/assets/types/Global";

export type COSStates = {
  loading: boolean;
  setLoading(loading: boolean): void;

  error: string;
  setError(error: string): void;
  page: number;
  setPage(page: number): void;

  onViewDetails: boolean;
  setOnViewDetails(view: boolean): void;
  onNewFiling: boolean;
  setOnNewFiling(newFiling: boolean): void;

  viewItems: CosItems;
  setViewItems(items: CosItems): void;

  scheduleItems: Schedules;
  setScheduleItems(items: Schedules): void;
  schedList: ScheduleItem[];
  setSchedList(items: ScheduleItem[]): void;

  // Alert Handles
  cancelAlert: boolean;
  setCancelAlert(endorse: boolean): void;
  endorseAlert: boolean;
  setEndorseAlert(endorse: boolean): void;
  approveAlert: boolean;
  setApproveAlert(approve: boolean): void;

  errorAlert: boolean;
  setErrorAlert(error: boolean): void;

  drawerFilter: boolean;
  setDrawerFilter(filter: boolean): void;
  filter: string;
  setFilter(filter: string): void;

  documentNo: string;
  setDocumentNo(docu: string): void;
  dateTransaction: [Date | null, Date | null];
  setDateTransaction(newValue: [Date | null, Date | null]): void;
  requested: string;
  setRequested(req: string): void;
  dateFiled: [Date | null, Date | null];
  setDateFiled(newValue: [Date | null, Date | null]): void;
  status: number[];
  setStatus(status: number[]): void;

  processedBy: string;
  setProcessedBy(processedBy: string): void;
  branchCode: number;
  setBranchCode(branchCode: number): void;
  employeeCode: number;
  setEmployeeCode(employeeCode: number): void;
  employeeName: string;
  setEmployeeName(employeeName: string): void;
};

export type ChangeScheduleTypes = {
  items: CosItems[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type CosItems = {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: Filings;
  dateTransaction: string;
};

type Filings = {
  id: number;
  guid: string;
  requested: Requested;
  documentNo: string;
  dateFiled: DateRangeType;
  dateTransaction: string;
  filingStatus: LookUpResponse;
  reason: string;
  fileAttachment: string;
};

type Requested = LookUpResponse & {
  isRestDay: boolean;
};

export type Schedules = {
  items: SchedulesItems[];
};

export type SchedulesItems = {
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
};

type ScheduleItem = {
  id: number;
  name: string;
  isRestDay: boolean;
};
