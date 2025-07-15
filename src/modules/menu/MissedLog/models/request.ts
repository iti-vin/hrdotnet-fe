/**
 * @author      Hersvin Fred
 * @date        March 24, 2025
 */

/**
 * @interface   CreateMissedLog
 */
export interface CreateMissedLog {
  DateFiled: string;
  LogTypeId: number;
  LogTypeName: string;
  TimeInOut: string;
  ReferenceNo: string;
  Reason: string;
  FileAttachment: string;
}

/**
 * @interface   UpdateMissedLogI
 */
export interface UpdateMissedLogI {
  UploadedFile: string;
  "Updater.Id": number;
  "Updater.Code": string;
  "Updater.Name": string;
  "Updater.CompanyId": number;
  "Updater.BranchId": number;
  "Updater.DepartmentId": number;
  Id: number;
  Guid: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  DateTransaction: string;
  DocumentNo: string;
  FilingStatusId: number;
  FilingStatus: string;
  DateFiled: string;
  LogTypeId: number;
  LogTypeName: string;
  TimeInOut: string;
  Reason: string;
  FileAttachment: string;
}

/**
 * @interface   SingleCancelMissedLog
 */
export interface SingleCancelMissedLog {
  "CancelledBy.Id": number;
  "CancelledBy.Code": string;
  "CancelledBy.Name": string;
  "CancelledBy.CompanyId": number;
  "CancelledBy.BranchId": number;
  "CancelledBy.DepartmentId": number;
  Id: number;
  Guid: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  DateTransaction: string;
  DocumentNo: string;
  FilingStatusId: number;
  FilingStatus: string;
  DateFiled: string;
  LogTypeId: number;
  LogTypeName: string;
  TimeInOut: string;
  ReferenceNo?: string;
  Reason: string;
  FileAttachment: string;
}

/**
 * @interface   SingleEndorseMissedLog
 */
export interface SingleEndorseMissedLog {
  Id: number;
  Guid: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  DateTransaction: string;
  DocumentNo: string;
  FilingStatusId: number;
  FilingStatus: string;
  DateFiled: string;
  LogTypeId: number;
  LogTypeName: string;
  TimeInOut: string;
  ReferenceNo: string;
  Reason: string;
  FileAttachment: string;
}

/**
 * @interface   SingleApproveMissedLog
 */
export interface SingleApproveMissedLog {
  "Approver.Id": number;
  "Approver.Code": string;
  "Approver.Name": string;
  "Approver.CompanyId": number;
  "Approver.BranchId": number;
  "Approver.DepartmentId": number;
  Id: number;
  Guid: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  DateTransaction: string;
  DocumentNo: string;
  FilingStatusId: number;
  FilingStatus: string;
  DateFiled: string;
  LogTypeId: number;
  LogTypeName: string;
  TimeInOut: string;
  ReferenceNo: string;
  Reason: string;
  FileAttachment: string;
}

/**
 * @interface   BatchApproveEndorseMissedLog
 */
export interface BatchApproveEndorseMissedLog {
  filings: BatchFilings[];
}
interface BatchFilings {
  recordId: number;
  employeeId: number;
  companyId: number;
  documentNo: string;
}
