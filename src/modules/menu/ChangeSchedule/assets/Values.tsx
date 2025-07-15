/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Global Types
import { DateRangeTypeValues, LookUpResponseValues } from "@shared/assets/types/Global";
//--- Cos Types
import { ChangeScheduleTypes, CosItems } from "./Types";

const Requested = {
  ...LookUpResponseValues,
  isRestDay: false,
};

const Filings = {
  id: 0,
  guid: "",
  requested: Requested,
  documentNo: "",
  dateFiled: DateRangeTypeValues,
  dateTransaction: "",
  filingStatus: LookUpResponseValues,
  reason: "",
  fileAttachment: "",
};

export const Items: CosItems = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  filing: Filings,
  dateTransaction: "",
};

export const ChangeScheduleValues: ChangeScheduleTypes = {
  items: [Items],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};

export const SchedulesItems = {
  id: 0,
  code: "",
  guid: "",
  name: "",
  description: "",
  timeIn: "",
  timeOut: "",
  breakIn: "",
  breakOut: "",
  shiftType: {
    id: 0,
    name: "",
  },
  shiftHours: 0,
  isRestDay: false,
};

export const SchedulesValues = {
  items: [SchedulesItems],
};
