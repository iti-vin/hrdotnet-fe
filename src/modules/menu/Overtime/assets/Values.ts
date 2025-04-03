import { SingleOvertime } from "../models/request";
import { OvertimeItems } from "../models/response";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { Batch } from "./types";

export const SingleDataOvertime = (data: OvertimeItems): SingleOvertime => {
  return {
    Id: data.filing.id,
    Guid: data.filing.guid,
    DocumentNo: data.filing.documentNo,
    EmployeeId: data.id,
    EmployeeCode: data.code,
    EmployeeName: data.name,
    CompanyId: data.companyId,
    BranchId: data.branchId,
    DepartmentId: data.departmentId,
    DateFiled: data.filing.dateFiled,
    Schedule: {
      Id: data.filing.shiftSchedule.id,
      Name: data.filing.shiftSchedule.name,
      Date: data.filing.shiftSchedule.date,
      TimeIn: data.filing.shiftSchedule.timeIn,
      TimeOut: data.filing.shiftSchedule.timeOut,
      BreakTimeIn: data.filing.shiftSchedule.breakTimeIn,
      BreakTimeOut: data.filing.shiftSchedule.breakTimeOut,
      IsPremium: data.filing.shiftSchedule.isPremium,
    },
    Actual: {
      TimeIn: DateTimeUtils.getCurrTimeDefault(data.filing.actual.dateFrom),
      TimeOut: DateTimeUtils.getCurrTimeDefault(data.filing.actual.dateTo),
    },
    Requested: {
      TimeIn: DateTimeUtils.getCurrTimeDefault(data.filing.requested.dateFrom),
      TimeOut: DateTimeUtils.getCurrTimeDefault(data.filing.requested.dateTo),
    },
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    NumberOfHours: data.filing.numberOfHours,
    Reason: data.filing.reason,
    FileAttachment: data.filing.fileAttachment,
  };
};

export const BatchDataOvertime = (data: OvertimeItems[]): Batch => {
  return {
    filings: data.map((item) => ({
      recordId: item.filing.id,
      employeeId: item.id,
      companyId: item.companyId,
      documentNo: item.filing.documentNo,
    })),
  };
};
