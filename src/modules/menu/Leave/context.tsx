/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Tab } from "@shared/assets/types/Global";
import { createContext, PropsWithChildren, useContext } from "react";
import useLeaveStore from "./store/LeaveStore";
import { LeaveLedgerServices } from "./services/ledger";

//--- React Modules

interface LeaveContextType {
  activeTab: number;
  leaveTabs: Tab[];
  setActiveTab(tab: number): void;

  onFetchLeaveOption(): void;
  onFetchLeaveParameter(): void;

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
}

const leaveTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "ledger", label: "My Ledger" },
  { index: 2, path: "reviewal", label: "For Review" },
  { index: 3, path: "approval", label: "For Approval" },
  { index: 4, path: "filings", label: "Employee Filing" },
];

const LeaveContext = createContext<LeaveContextType>({
  activeTab: 0,
  leaveTabs: [],
  setActiveTab: () => {},

  onFetchLeaveOption: () => {},
  onFetchLeaveParameter: () => {},

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
});

export const LeaveProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setLeaveOption, setLeaveType, activeTab, setActiveTab, setLoading, setPage, setStatus, storedPage, setStoredPage, setStoredFilters, setDataFilter } = useLeaveStore();

  const onFetchLeaveOption = async () => {
    const response = await LeaveLedgerServices.getLeaveOption();
    setLeaveOption(response.items.map((item) => ({ id: item.id, name: item.name, type: item.code, amount: item.amount })));
  };

  const onFetchLeaveParameter = async () => {
    const response = await LeaveLedgerServices.getLeaveParameter();
    setLeaveType(response.items.map((item) => ({ id: item.id, name: item.name, code: item.code })));
  };

  const onHandleSubmitFilter = async (filter: any) => {
    setLoading(true);
    setStoredFilters({ ...filter });
  };

  const onHandleClearFilter = async () => {
    setLoading(true);
    setStoredFilters({});
    setDataFilter({ DocumentNo: null, LeaveType: null, DateField: null, DateFrom: null, DateTo: null, LeaveParameter: null });
    setStatus([]);
  };

  const onHandleChangePage = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
    setStoredPage({ ...storedPage, Page: newPage });
  };

  const onHandlePageSize = async (pageSize: any) => {
    setStoredPage({ ...storedPage, ...pageSize });
    setLoading(true);
  };

  return (
    <LeaveContext.Provider
      value={{ activeTab, setActiveTab, leaveTabs, onFetchLeaveOption, onFetchLeaveParameter, onHandleChangePage, onHandlePageSize, onHandleSubmitFilter, onHandleClearFilter }}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = (): LeaveContextType => {
  const context = useContext(LeaveContext);

  if (!context) {
    throw new Error("useLeave must be use inside of the Leave Provider");
  }

  return context;
};
