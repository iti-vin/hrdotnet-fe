/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { BatchApproveEndorseMissedLog, SingleCancelMissedLog, UpdateMissedLogI } from "../models/request";
import { MissedLogItems } from "../models/response";

export const CancelMissedLog = (data: MissedLogItems): SingleCancelMissedLog => {
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
    "CancelledBy.Id": data.id,
    "CancelledBy.Code": data.code,
    "CancelledBy.Name": data.name,
    "CancelledBy.CompanyId": data.companyId,
    "CancelledBy.BranchId": data.branchId,
    "CancelledBy.DepartmentId": data.departmentId,
    DateTransaction: data.filing.dateTransaction,
    FileAttachment: data.filing.fileAttachment,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    DateFiled: data.filing.dateFiled!,
    LogTypeId: data.filing.logType.id,
    LogTypeName: data.filing.logType.name,
    TimeInOut: data.filing.timeInOut,
    Reason: data.filing.reason,
  };
};

export const UpdateMissedLog = (data: MissedLogItems): UpdateMissedLogI => {
  return {
    UploadedFile: "",
    "Updater.Id": data.id,
    "Updater.Code": data.code,
    "Updater.Name": data.name,
    "Updater.CompanyId": data.companyId,
    "Updater.BranchId": data.branchId,
    "Updater.DepartmentId": data.departmentId,
    Id: data.filing.id,
    Guid: data.filing.guid,
    EmployeeId: data.id,
    EmployeeCode: data.code,
    EmployeeName: data.name,
    CompanyId: data.companyId,
    BranchId: data.branchId,
    DepartmentId: data.departmentId,
    DateTransaction: data.filing.dateTransaction,
    DocumentNo: data.filing.documentNo,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    DateFiled: data.filing.dateFiled!,
    LogTypeId: data.filing.logType.id,
    LogTypeName: data.filing.logType.name,
    TimeInOut: data.filing.timeInOut,
    Reason: data.filing.reason,
    FileAttachment: data.filing.fileAttachment,
  };
};

export const ApproveEndorseMissedLog = (data: MissedLogItems): SingleCancelMissedLog => {
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
    "CancelledBy.Id": data.id,
    "CancelledBy.Code": data.code,
    "CancelledBy.Name": data.name,
    "CancelledBy.CompanyId": data.companyId,
    "CancelledBy.BranchId": data.branchId,
    "CancelledBy.DepartmentId": data.departmentId,
    DateTransaction: data.filing.dateTransaction,
    FileAttachment: data.filing.fileAttachment,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    DateFiled: data.filing.dateFiled!,
    LogTypeId: data.filing.logType.id,
    LogTypeName: data.filing.logType.name,
    TimeInOut: data.filing.timeInOut,
    Reason: data.filing.reason,
  };
};

export const BatchMissedLog = (data: MissedLogItems[]): BatchApproveEndorseMissedLog => {
  return {
    filings: data.map((item) => ({
      recordId: item.filing.id,
      employeeId: item.id,
      companyId: item.companyId,
      documentNo: item.filing.documentNo,
    })),
  };
};
