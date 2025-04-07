/**
 * @interface  SingleOffset
 */

export interface SingleOffset {
  Id: number;
  Guid: string;
  DocumentNo: string;
  EmployeeId: number;
  EmployeeCode: string;
  EmployeeName: string;
  CompanyId: number;
  BranchId: number;
  DepartmentId: number;
  DateFiled: string;
  Schedule: {
    Id: number;
    Name: string;
    Date: string;
    TimeIn: string;
    TimeOut: string;
    BreakTimeIn: string;
    BreakTimeOut: string;
    IsPremium: boolean;
  };
  Actual: {
    TimeIn: string;
    TimeOut: string;
  };
  Requested: {
    TimeIn: string;
    TimeOut: string;
  };
  FilingStatusId: number;
  FilingStatus: string;
  Reason: string;
  FileAttachment: string;
}

export interface CreateOffset {
  DateFiled: string | null;
  Schedule: {
    Id: number;
    Name: string;
    Date: string | null;
    TimeIn: string;
    TimeOut: string;
    BreakTimeIn: string;
    BreakTimeOut: string;
    IsPremium: boolean;
  };
  Actual: {
    TimeIn: string;
    TimeOut: string;
  };
  Requested: {
    TimeIn: string;
    TimeOut: string;
  };
  Reason: string;
  FileAttachment: string;
}
