/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useContext, PropsWithChildren, createContext } from "react";
//--- Shared Modules
import { Tab } from "@shared/assets/types/Global";
//--- Store
import { useChangeOfScheduleStore } from "./store";
import { CosServices } from "./services/api";

interface CosContextType {
  cosTabs: Tab[];

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
  fetchScheduleItems(): void;
}

const cosTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

const COSContext = createContext<CosContextType>({
  cosTabs: [],

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
  fetchScheduleItems: () => {},
});

export const CosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setPage, storedPage, setLoading, setStoredPage, setStoredFilters, setScheduleItems } =
    useChangeOfScheduleStore();
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

  const fetchScheduleItems = async () => {
    const data = await CosServices.getSchedules();
    setScheduleItems(data);
  };

  return (
    <COSContext.Provider
      value={{
        cosTabs,
        onHandleChangePage,
        onHandlePageSize,
        onHandleSubmitFilter,
        onHandleClearFilter,
        fetchScheduleItems,
      }}>
      {children}
    </COSContext.Provider>
  );
};

export const useChangeOfScheduleContext = (): CosContextType => {
  const context = useContext(COSContext);
  if (!context) {
    throw new Error("useChangeOfSchedule must be use inside of the COSProvider");
  }

  return context;
};
