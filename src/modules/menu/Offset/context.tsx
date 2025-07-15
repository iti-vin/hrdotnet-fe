/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

//--- Shared Modules
import { Tab } from "@shared/assets/types/Global";
import { useOffsetStore } from "./store";

interface OffsetContextInterface {
  offsetTabs: Tab[];

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
}

const offsetTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

const OffsetContext = createContext<OffsetContextInterface>({
  offsetTabs: offsetTabs,

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
});

export const OffsetProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { setPage, storedPage, setLoading, setStoredPage, setStoredFilters } = useOffsetStore();
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
    <OffsetContext.Provider
      value={{ offsetTabs, onHandleChangePage, onHandlePageSize, onHandleSubmitFilter, onHandleClearFilter }}>
      {children}
    </OffsetContext.Provider>
  );
};

export const useOffsetContext = (): OffsetContextInterface => {
  const context = useContext(OffsetContext);

  if (!context) {
    throw new Error("useOffsetContext must be used within a OffsetProvider");
  }

  return context;
};
