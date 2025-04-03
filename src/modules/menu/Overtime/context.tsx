/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Tab } from "@shared/assets/types/Global";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";
import { useOvertimeStore } from "./store";

interface OvertimeContextInterface {
  overtimeTabs: Tab[];

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
}

const overtimeTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

const OvertimeContext = createContext<OvertimeContextInterface>({
  overtimeTabs: [],

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
});

export const OvertimeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { setPage, storedPage, setLoading, setStoredPage, setStoredFilters } = useOvertimeStore();
  const onHandleSubmitFilter = (filterParams: Record<string, any>) => {
    setLoading(true);
    setStoredFilters({ ...filterParams });
  };

  const onHandleClearFilter = () => {
    setStoredFilters({});
    setLoading(true);
  };

  const onHandleChangePage = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
    setStoredPage({ ...storedPage, Page: newPage });
  };

  const onHandlePageSize = (pageParams: Record<string, any>) => {
    setLoading(true);
    setStoredPage({ ...storedPage, ...pageParams });
  };

  return (
    <OvertimeContext.Provider
      value={{
        overtimeTabs,
        onHandleChangePage,
        onHandlePageSize,
        onHandleSubmitFilter,
        onHandleClearFilter,
      }}>
      {children}
    </OvertimeContext.Provider>
  );
};

export const useOvertimeContext = (): OvertimeContextInterface => {
  const context = useContext(OvertimeContext);

  if (!context) {
    throw new Error("useOvertimeContext must be used within and OvertimeProvider");
  }

  return context;
};
