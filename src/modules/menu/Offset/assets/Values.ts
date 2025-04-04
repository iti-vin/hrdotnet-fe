import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { SingleOffset } from "../models/request";
import { OffsetItems } from "../models/response";

export const SingleDataOffset = (data: OffsetItems): SingleOffset => {
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
    Reason: data.filing.reason,
    FileAttachment: data.filing.fileAttachment,
  };
};
