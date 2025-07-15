/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
export interface BatchMissedLogI {
  filings: [BatchFilingsI];
  validator: BatchValidatorsI;
}
export interface BatchFilingsI {
  id: number;
  companyId: number;
  employeeId: number;
  documentNo: string;
  statusCode: number;
  errors: [BatchErrorI];
}

export interface BatchValidatorsI {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
}

export interface BatchErrorI {
  code: string;
  errorType: number;
  message: string;
}
