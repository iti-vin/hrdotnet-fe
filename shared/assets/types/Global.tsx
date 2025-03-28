export enum FilingStatus {
  Approved = "Approved",
  Cancelled = "Cancelled",
  Reviewed = "Reviewed",
  Filed = "Filed",
  Posted = "Posted",
}

export enum Tabs {
  List = "List",
  Review = "Review",
  Approve = "Approve",
}

export type DateRangeType = {
  dateFrom: string;
  dateTo: string;
};

export type LookUpResponse = {
  id: number;
  name: string;
  code?: string;
  description?: string;
};

export const DateRangeTypeValues = {
  dateFrom: "",
  dateTo: "",
};

export const LookUpResponseValues = {
  id: 0,
  name: "",
  code: "",
  description: "",
};

export const statusColors = [
  { status: "Reviewed", color: "#FF7800" },
  { status: "Approved", color: "#1E8449" },
  { status: "Cancelled", color: "#FF4B34" },
  { status: "Filed", color: "#9B51E0" },
  { status: "Posted", color: "gray" },
];

export interface Tab {
  index: number;
  path: string;
  label: string;
}

export interface Response {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ResponseItem {
  id: number;
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  dateTransaction: string;
}

export enum PanelNavList {
  Request = "REQUEST",
  Reviewal = "REVIEWAL",
  Approval = "APPROVAL",
  Filings = "FILINGS",
}

export type Panel = "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
