/**
 * @interface   BatchOfficialBusiness
 */
export interface BatchOfficialBusiness {
  filings: BatchFilings[];
}
interface BatchFilings {
  recordId: number;
  employeeId: number;
  companyId: number;
  documentNo: string;
}

/**
 * @interface   SingleOfficialBusiness
 */

export interface SingleOfficialBusiness {
  Id: number;
  Guid: string;
  DocumentNo: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  LocationId: number;
  Location: string;
  LocationBranchId: number;
  LocationBranch: string;
  DateTransaction: string;
  DateFrom: string;
  DateTo: string;
  TimeIn: string;
  TimeOut: string;
  Reason: string;
  FilingStatusId: number;
  FilingStatus: string;
  ReferenceNo: string;
  FileAttachment: string;
}
