/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

//--- Shared Modules
import { Tab } from "@shared/assets/types/Global";

interface CTOContextInterface {
  ctoTabs: Tab[];

  onHandleSubmitFilter(filter?: any): void;
  onHandleClearFilter(): void;
  onHandleChangePage(page?: number): void;
  onHandlePageSize(size?: any): void;
}

const ctoTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

const CTOContext = createContext<CTOContextInterface>({
  ctoTabs: ctoTabs,

  onHandleSubmitFilter: () => {},
  onHandleClearFilter: () => {},
  onHandleChangePage: () => {},
  onHandlePageSize: () => {},
});

export const CTOProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const onHandleSubmitFilter = (filterParams: Record<string, any>) => {
    console.log("Filter", filterParams);
  };

  const onHandleClearFilter = () => {};

  const onHandleChangePage = (newPage: number) => {
    console.log("Change Page", newPage);
  };

  const onHandlePageSize = (pageParams: Record<string, any>) => {
    console.log("Change Page Size", pageParams);
  };
  return <CTOContext.Provider value={{ ctoTabs, onHandleChangePage, onHandlePageSize, onHandleSubmitFilter, onHandleClearFilter }}>{children}</CTOContext.Provider>;
};

export const useCTOContext = (): CTOContextInterface => {
  const context = useContext(CTOContext);

  if (!context) {
    throw new Error("useCTOContext must be used within a CTOProvider");
  }

  return context;
};
