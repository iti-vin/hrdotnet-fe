/**
 * @author      Hersvin Fred
 * @date        March 24, 2025
 */

import { LookUpResponse, LookUpResponseValues, Response, ResponseItem } from "@shared/assets/types/Global";

/**
 * @interface   MissedLogResponse
 */
export interface MissedLogResponse extends Response {
  items: MissedLogItems[];
}
/**
 * @interface   MissedLogResponse
 */
export interface MissedLogItems extends ResponseItem {
  filing: MissedLogFilings;
}
interface MissedLogFilings {
  id: number;
  guid: string;
  documentNo: string;
  timeInOut: string;
  dateFiled: string | null;
  dateTransaction: string;
  reason: string;
  filingStatus: LookUpResponse;
  logType: LookUpResponse;
  fileAttachment: string;
}

/**
 * @const   MissedLogFilingsInitialValue
 */
export const MissedLogFilingsInitialValue: MissedLogFilings = {
  id: 0,
  guid: "",
  documentNo: "",
  timeInOut: "",
  dateFiled: null,
  dateTransaction: "",
  reason: "",
  filingStatus: LookUpResponseValues,
  logType: LookUpResponseValues,
  fileAttachment: "",
};

/**
 * @const   MissedLogItemsInitialValue
 */
export const MissedLogItemsInitialValue: MissedLogItems = {
  id: 0,
  code: "",
  name: "",
  companyId: 0,
  branchId: 0,
  departmentId: 0,
  dateTransaction: "",
  filing: MissedLogFilingsInitialValue,
};

/**
 * @const   MissedLogResponseInitialValue
 */
export const MissedLogResponseInitialValue: MissedLogResponse = {
  items: [MissedLogItemsInitialValue],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};
