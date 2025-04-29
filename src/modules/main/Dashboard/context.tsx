/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

interface DashboardContextI {}

const DashboardContext = createContext<DashboardContextI>({} as DashboardContextI);

export const DashboardProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextI => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }

  return context;
};
