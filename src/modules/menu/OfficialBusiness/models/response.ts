/**
 * @author      Hersvin Fred
 * @date        March 24, 2025
 */

import { DateRangeType, DateRangeTypeValues, LookUpResponse, LookUpResponseValues, Response, ResponseItem } from "@shared/assets/types/Global";
/**
 * @interface   OfficialBusinessResponse
 */
export interface OfficialBusinessResponse extends Response {
  items: OfficialBusinessItems[];
}
/**
 * @interface   OfficialBusinessItems
 */
export interface OfficialBusinessItems extends ResponseItem {
  filing: OfficialBusinessFilings;
}
/**
 * @interface   MissedLogOfficialBusinessFilingsResponse
 */
interface OfficialBusinessFilings {
  id: number;
  guid: string;
  documentNo: string;
  location: LookUpResponse & LocationI;
  dateRange: DateRangeType;
  timeRange: TimeRange;
  dateTransaction: string;
  filingStatus: LookUpResponse;
  reason: string;
  fileAttachment: string;
}
/**
 * @interface   LocationI
 */
interface LocationI {
  locationBranchId: number;
  locationBranch: string;
}
/**
 * @interface   TimeRange
 */
interface TimeRange {
  timeIn: string;
  timeOut: string;
}

/**
 * @const   LocationValues
 */
export const LocationValues: LocationI = {
  locationBranchId: 0,
  locationBranch: "",
};
/**
 * @const   TimeRangeValues
 */
export const TimeRangeValues: TimeRange = {
  timeIn: "",
  timeOut: "",
};
/**
 * @const   OfficialBusinessFilingsValues
 */
export const OfficialBusinessFilingsValues: OfficialBusinessFilings = {
  id: 0,
  guid: "",
  documentNo: "",
  location: { ...LookUpResponseValues, ...LocationValues },
  dateRange: DateRangeTypeValues,
  timeRange: TimeRangeValues,
  dateTransaction: "",
  filingStatus: LookUpResponseValues,
  reason: "",
  fileAttachment: "",
};
/**
 * @const   OfficialBusinessItemsValues
 */
export const OfficialBusinessItemsValues: OfficialBusinessItems = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  dateTransaction: "",
  filing: OfficialBusinessFilingsValues,
};
/**
 * @const   OfficialBusinessValues
 */
export const OfficialBusinessValues: OfficialBusinessResponse = {
  items: [OfficialBusinessItemsValues],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};

/**
 * @interface   MaintenanceLocation
 */
export interface MaintenanceLocation {
  items: MaintenanceLocationItems[];
  total: number;
}
export interface MaintenanceLocationItems {
  id: number;
  code: string;
  guid: string;
  name: string;
  description: string;
}

/**
 * @interface   MaintenanceBranch
 */
export interface MaintenanceBranch extends Response {
  items: MaintenanceBranchItems[];
}
export interface MaintenanceBranchItems {
  guid: string;
  code: string;
  companyId: number;
  id: number;
  name: string;
  description: string;
  location: LookUpResponse;
  coordinates: Coordinates;
  radius: number;
  area: LookUpResponse;
  isActive: boolean;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

/**
 * @const   MaintenanceLocationValues
 */
export const MaintenanceLocationItemsValues: MaintenanceLocationItems = {
  id: 0,
  code: "",
  guid: "",
  name: "",
  description: "",
};
export const MaintenanceLocationValues: MaintenanceLocation = {
  items: [MaintenanceLocationItemsValues],
  total: 0,
};

/**
 * @const   MaintenanceBranchValues
 */
const CoordinatesValues = {
  longitude: 0,
  latitude: 0,
};
export const MaintenanceBranchItemsValues: MaintenanceBranchItems = {
  guid: "",
  code: "",
  companyId: 0,
  id: 0,
  name: "",
  description: "",
  location: LookUpResponseValues,
  coordinates: CoordinatesValues,
  radius: 0,
  area: LookUpResponseValues,
  isActive: false,
};
export const MaintenanceBranchValues: MaintenanceBranch = {
  items: [MaintenanceBranchItemsValues],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};
