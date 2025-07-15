/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";
//--- Shared Modules
import { Tab } from "@shared/assets/types/Global";

//--- Missed Log
import { useMissedLogStore } from "./store/main";

const missedLogTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filing" },
];

interface MissedLogContextInterface {
  missedLogTabs: Tab[];

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
}

const MissedLogContext = createContext<MissedLogContextInterface>({
  missedLogTabs: [],

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
});

export const MissedLogProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { setLoading, setPage, setStoredPage, setStoredFilters, storedPage } = useMissedLogStore();

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
    <MissedLogContext.Provider value={{ missedLogTabs, onHandleChangePage, onHandlePageSize, onHandleSubmitFilter, onHandleClearFilter }}>{children}</MissedLogContext.Provider>
  );
};

export const useMissedLogContext = (): MissedLogContextInterface => {
  const context = useContext(MissedLogContext);
  if (!context) {
    throw new Error("useMissedLogContext must be use inside of the MissedLogProvider");
  }

  return context;
};
