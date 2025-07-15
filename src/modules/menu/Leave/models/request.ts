/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { LeaveItems } from "../assets/Types";

export interface Create {
  "DateFiled.DateFrom": string;
  "DateFiled.DateTo": string;
  "LeaveParameter.Id": number;
  "LeaveParameter.Code": string;
  "LeaveParameter.Name": string;
  "LeaveOption.Id": number;
  "LeaveOption.Name": string;
  "LeaveOption.Type": string;
  "LeaveOption.Amount": string;
  ReferenceNo: string;
  Reason: string;
  FileAttachment: string;
}

type CreateType = {
  DateFiled: { DateFrom: string; DateTo: string };
  LeaveParameter: { Id: number; Code: string; Name: string };
  LeaveOption: {
    Id: number;
    Name: string;
    Type: string;
    Amount: string;
  };
  Reason: string;
  ReferenceNo: string;
  FileAttachment: string;
};

export const CreateData = (data: CreateType): Create => {
  return {
    "DateFiled.DateFrom": data.DateFiled.DateFrom,
    "DateFiled.DateTo": data.DateFiled.DateTo,
    "LeaveParameter.Id": data.LeaveParameter.Id,
    "LeaveParameter.Code": data.LeaveParameter.Code,
    "LeaveParameter.Name": data.LeaveParameter.Name,
    "LeaveOption.Id": data.LeaveOption.Id,
    "LeaveOption.Name": data.LeaveOption.Name,
    "LeaveOption.Type": data.LeaveOption.Type,
    "LeaveOption.Amount": data.LeaveOption.Amount,
    ReferenceNo: data.ReferenceNo,
    Reason: data.Reason,
    FileAttachment: data.FileAttachment,
  };
};

export interface Update {
  UploadedFile: string;
  Id: number;
  Guid: string;
  DocumentNo: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  "DateFiled.DateFrom": string;
  "DateFiled.DateTo": string;
  "LeaveParameter.Id": number;
  "LeaveParameter.Code": string;
  "LeaveParameter.Name": string;
  "LeaveOption.Id": number;
  "LeaveOption.Name": string;
  "LeaveOption.Type": string;
  "LeaveOption.Amount": number;
  FilingStatusId: string;
  FilingStatus: string;
  ReferenceNo: string;
  DateTransaction: string;
  FileAttachment: string;
  Reason: string;
}

export interface Single {
  Id: number;
  Guid: string;
  DocumentNo: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  "DateFiled.DateFrom": string;
  "DateFiled.DateTo": string;
  "LeaveParameter.Id": number;
  "LeaveParameter.Code": string;
  "LeaveParameter.Name": string;
  "LeaveOption.Id": number;
  "LeaveOption.Name": string;
  "LeaveOption.Type": string;
  "LeaveOption.Amount": string;
  FilingStatusId: number;
  FilingStatus: string;
  ReferenceNo: string;
  DateTransaction: string;
  FileAttachment: string;
  Reason: string;
}

export interface Batch {
  filings: BatchFilings[];
}

interface BatchFilings {
  recordId: number;
  employeeId: number;
  companyId: number;
  documentNo: string;
}

export const BatchData = (data: LeaveItems[]): Batch => {
  return {
    filings: data.map((item) => ({
      recordId: item.filing.id,
      employeeId: item.id,
      companyId: item.companyId,
      documentNo: item.filing.documentNo,
    })),
  };
};

export const CancelData = (data: LeaveItems): Single => {
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
    "DateFiled.DateFrom": data.filing.dateFiled.dateFrom,
    "DateFiled.DateTo": data.filing.dateFiled.dateTo,
    "LeaveParameter.Id": data.filing.leaveParameter.id,
    "LeaveParameter.Code": data.filing.leaveParameter.code!,
    "LeaveParameter.Name": data.filing.leaveParameter.name,
    "LeaveOption.Id": data.filing.leaveOption.id,
    "LeaveOption.Name": data.filing.leaveOption.name,
    "LeaveOption.Type": data.filing.leaveOption.type,
    "LeaveOption.Amount": data.filing.leaveOption.amount,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    ReferenceNo: data.filing.referenceNo,
    DateTransaction: data.filing.dateTransaction,
    FileAttachment: data.filing.fileAttachment,
    Reason: data.filing.reason,
  };
};

export const ApproveEndorseData = (data: LeaveItems): Single => {
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
    "DateFiled.DateFrom": data.filing.dateFiled.dateFrom,
    "DateFiled.DateTo": data.filing.dateFiled.dateTo,
    "LeaveParameter.Id": data.filing.leaveParameter.id,
    "LeaveParameter.Code": data.filing.leaveParameter.code!,
    "LeaveParameter.Name": data.filing.leaveParameter.name,
    "LeaveOption.Id": data.filing.leaveOption.id,
    "LeaveOption.Name": data.filing.leaveOption.name,
    "LeaveOption.Type": data.filing.leaveOption.type,
    "LeaveOption.Amount": data.filing.leaveOption.amount,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    ReferenceNo: data.filing.referenceNo,
    DateTransaction: data.filing.dateTransaction,
    FileAttachment: data.filing.fileAttachment,
    Reason: data.filing.reason,
  };
};

export interface ExtendedSingle extends Single {
  UploadedFile: string;
}

export const UpdateInitialData = (data: LeaveItems) => {
  return {
    UploadedFile: "",
    Id: data.filing.id,
    Guid: data.filing.guid,
    DocumentNo: data.filing.documentNo,
    EmployeeId: data.id,
    EmployeeCode: data.code,
    EmployeeName: data.name,
    CompanyId: data.companyId,
    BranchId: data.branchId,
    DepartmentId: data.departmentId,
    DateFiled: {
      DateFrom: data.filing.dateFiled.dateFrom,
      DateTo: data.filing.dateFiled.dateTo,
    },
    LeaveParameter: {
      Id: data.filing.leaveParameter.id,
      Code: data.filing.leaveParameter.code!,
      Name: data.filing.leaveParameter.name,
    },
    LeaveOption: {
      Id: data.filing.leaveOption.id,
      Name: data.filing.leaveOption.name,
      Type: data.filing.leaveOption.type,
      Amount: data.filing.leaveOption.amount,
    },
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    ReferenceNo: data.filing.referenceNo,
    DateTransaction: data.filing.dateTransaction,
    Reason: data.filing.reason,
  };
};

type UpdatedValues = {
  UploadedFile: string;
  Id: number;
  Guid: string;
  DocumentNo: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  DateFiled: { DateFrom: string; DateTo: string };
  LeaveParameter: {
    Id: number;
    Code: string;
    Name: string;
  };
  LeaveOption: {
    Id: number;
    Name: string;
    Type: string;
    Amount: string;
  };
  FilingStatusId: number;
  FilingStatus: string;
  ReferenceNo: string;
  DateTransaction: string;
  FileAttachment: string;
  Reason: string;
};

export const UpdateData = (data: UpdatedValues): ExtendedSingle => {
  return {
    UploadedFile: data.UploadedFile,
    Id: data.Id,
    Guid: data.Guid,
    DocumentNo: data.DocumentNo,
    EmployeeId: data.EmployeeId,
    EmployeeCode: data.EmployeeCode,
    EmployeeName: data.EmployeeName,
    CompanyId: data.CompanyId,
    BranchId: data.BranchId,
    DepartmentId: data.DepartmentId,
    "DateFiled.DateFrom": data.DateFiled.DateFrom,
    "DateFiled.DateTo": data.DateFiled.DateTo,
    "LeaveParameter.Id": data.LeaveParameter.Id,
    "LeaveParameter.Code": data.LeaveParameter.Code!,
    "LeaveParameter.Name": data.LeaveParameter.Name,
    "LeaveOption.Id": data.LeaveOption.Id,
    "LeaveOption.Name": data.LeaveOption.Name,
    "LeaveOption.Type": data.LeaveOption.Type,
    "LeaveOption.Amount": data.LeaveOption.Amount,
    FilingStatusId: data.FilingStatusId,
    FilingStatus: data.FilingStatus,
    ReferenceNo: data.ReferenceNo,
    DateTransaction: data.DateTransaction,
    FileAttachment: data.FileAttachment,
    Reason: data.Reason,
  };
};
