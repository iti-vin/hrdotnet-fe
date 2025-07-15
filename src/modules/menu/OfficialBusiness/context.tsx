/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Tab } from "@shared/assets/types/Global";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";
import { useOfficialBusinessStore } from "./store";
import { OfficialBusinessServices } from "./services/api";

interface OfficialBusinessContextInterface {
  officialBusinessTabs: Tab[];

  activeTab: number;
  setActiveTab(tab: number): void;

  onFetchMaintenanceBranch(id?: string): void;
  onFetchMaintenanceLocation(): void;

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
}

const officialBusinessTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

const OfficialBusinessContext = createContext<OfficialBusinessContextInterface>({
  officialBusinessTabs: [],

  activeTab: 1,
  setActiveTab: () => {},

  onFetchMaintenanceBranch: () => {},
  onFetchMaintenanceLocation: () => {},

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
});

export const OfficialBusinessProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { activeTab, setActiveTab, setBranches, setLocations, setPage, storedPage, setLoading, setStoredPage, setStoredFilters } = useOfficialBusinessStore();

  const onFetchMaintenanceBranch = async (id: string) => {
    const response = await OfficialBusinessServices.getAllBranch(id);
    setBranches(response.items.map((item) => ({ id: item.guid, name: item.name, code: item.code })));
  };

  const onFetchMaintenanceLocation = async () => {
    const response = await OfficialBusinessServices.getAllLocation();
    setLocations(response.items.map((item) => ({ id: item.id, name: item.name, code: item.code })));
  };

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
    <OfficialBusinessContext.Provider
      value={{
        activeTab,
        setActiveTab,
        officialBusinessTabs,
        onFetchMaintenanceBranch,
        onFetchMaintenanceLocation,
        onHandleChangePage,
        onHandlePageSize,
        onHandleSubmitFilter,
        onHandleClearFilter,
      }}>
      {children}
    </OfficialBusinessContext.Provider>
  );
};

export const useOfficialBusinessContext = () => {
  const context = useContext(OfficialBusinessContext);
  if (!context) {
    throw new Error("useOfficialBusinessContext must be used within an OfficialBusinessProvider");
  }
  return context;
};
