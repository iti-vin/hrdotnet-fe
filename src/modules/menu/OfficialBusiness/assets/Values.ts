import { BatchApproveEndorseMissedLog } from "../../MissedLog/models/request";
import { SingleOfficialBusiness } from "../models/request";
import { OfficialBusinessItems } from "../models/response";

export const SingleDataOfficialBusiness = (data: OfficialBusinessItems): SingleOfficialBusiness => {
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
    LocationId: data.filing.location.id,
    Location: data.filing.location.name,
    LocationBranchId: data.filing.location.locationBranchId,
    LocationBranch: data.filing.location.locationBranch,
    DateTransaction: data.filing.dateTransaction,
    DateFrom: data.filing.dateRange.dateFrom,
    DateTo: data.filing.dateRange.dateTo,
    TimeIn: data.filing.timeRange.timeIn,
    TimeOut: data.filing.timeRange.timeOut,
    Reason: data.filing.reason,
    FilingStatusId: data.filing.filingStatus.id,
    FilingStatus: data.filing.filingStatus.name,
    ReferenceNo: "",
    FileAttachment: data.filing.fileAttachment,
  };
};

export const BatchDataOfficialBusiness = (data: OfficialBusinessItems[]): BatchApproveEndorseMissedLog => {
  return {
    filings: data.map((item) => ({
      recordId: item.filing.id,
      employeeId: item.id,
      companyId: item.companyId,
      documentNo: item.filing.documentNo,
    })),
  };
};
