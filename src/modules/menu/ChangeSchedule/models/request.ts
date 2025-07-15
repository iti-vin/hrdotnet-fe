/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { CosItems } from "../assets/Types";

export interface Batch {
  filings: BatchFilings[];
}

interface BatchFilings {
  recordId: number;
  employeeId: number;
  companyId: number;
  documentNo: string;
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
  "Requested.Id": number;
  "Requested.Name": string;
  "Requested.IsRestDay": boolean;
  FilingStatusId: number;
  FilingStatus: string;
  ReferenceNo: string;
  DateTransaction: string;
  FileAttachment: string;
  Reason: string;
}

export const SingleData = (data: CosItems): Single => {
  return {
    Id: data.filing.id,
    Guid: data.filing.guid,
    DocumentNo: data.filing.documentNo,
    EmployeeId: data.id,
    EmployeeCode: data.code,
    EmployeeName: data.name,
    CompanyId: data.companyId,
    BranchId: data.branchId,
    DepartmentId: data?.departmentId,
    "DateFiled.DateFrom": data?.filing?.dateFiled?.dateFrom,
    "DateFiled.DateTo": data?.filing?.dateFiled?.dateTo,
    "Requested.Id": data?.filing?.requested?.id,
    "Requested.Name": data?.filing?.requested?.name,
    "Requested.IsRestDay": data?.filing?.requested?.isRestDay,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    ReferenceNo: "",
    DateTransaction: data.filing.dateTransaction,
    FileAttachment: data.filing.fileAttachment,
    Reason: data.filing.reason,
  };
};

export interface Request {
  "DateFiled.DateFrom": string;
  "DateFiled.DateTo": string;
  "Requested.Id": number;
  "Requested.Name": string;
  "Requested.IsRestDay": boolean;
  Reason: string;
  FileAttachment: string;
}

type RequestValues = {
  DateFiled: {
    DateFrom: string;
    DateTo: string;
  };
  Requested: {
    Id: number;
    Name: string;
    IsRestDay: boolean;
  };
  Reason: string;
  FileAttachment: string;
};

export const RequestData = (data: RequestValues): Request => {
  return {
    "DateFiled.DateFrom": data.DateFiled.DateFrom,
    "DateFiled.DateTo": data.DateFiled.DateTo,
    "Requested.Id": data.Requested.Id,
    "Requested.Name": data.Requested.Name,
    "Requested.IsRestDay": data.Requested.IsRestDay,
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
  "Requested.Id": number;
  "Requested.Name": string;
  "Requested.IsRestDay": boolean;
  FilingStatusId: number;
  FilingStatus: string;
  ReferenceNo: string;
  DateTransaction: string;
  FileAttachment: string;
  Reason: string;
}

type UpdateValues = {
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
  Requested: {
    Id: number;
    Name: string;
    IsRestDay: boolean;
  };
  FilingStatusId: number;
  FilingStatus: string;
  ReferenceNo: string;
  DateTransaction: string;
  FileAttachment: string;
  Reason: string;
};

export const UpdateInitialData = (data: CosItems) => {
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
    DepartmentId: data?.departmentId,
    DateFiled: { DateFrom: data.filing.dateFiled.dateFrom, DateTo: data.filing.dateFiled.dateFrom },
    Requested: {
      Id: data.filing.requested.id,
      Name: data.filing.requested.name,
      IsRestDay: data.filing.requested.isRestDay,
    },
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    ReferenceNo: "",
    DateTransaction: data.filing.dateTransaction,
    FileAttachment: data.filing.fileAttachment,
    Reason: data.filing.reason,
  };
};

export const UpdateData = (data: UpdateValues): Update => {
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
    "Requested.Id": data.Requested.Id,
    "Requested.Name": data.Requested.Name,
    "Requested.IsRestDay": data.Requested.IsRestDay,
    FilingStatusId: data.FilingStatusId,
    FilingStatus: data.FilingStatus,
    ReferenceNo: data.ReferenceNo,
    DateTransaction: data.DateTransaction,
    FileAttachment: data.FileAttachment,
    Reason: data.Reason,
  };
};

export interface ReviewValues {
  filings: {
    recordId: number;
    employeeId: number;
    companyId: number;
    documentNo: string;
  }[];
}

export const BatchData = (data: CosItems[]): ReviewValues => {
  return {
    filings: data.map((item) => ({
      recordId: item.filing.id,
      employeeId: item.id,
      companyId: item.companyId,
      documentNo: item.filing.documentNo,
    })),
  };
};
