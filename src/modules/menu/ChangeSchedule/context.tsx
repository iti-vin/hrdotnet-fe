/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useState, useEffect, useContext, PropsWithChildren, createContext } from "react";
//--- Shared Modules
import { Tab } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
//--- Store
import useCOS from "./store";

interface CosContextType {
  activeTab: number;
  setActiveTab(index: number): void;
  cosTabs: Tab[];

  onHandleClearFilter(): void;
  onHandleSubmitFilter(): void;
  onHandleChangePage(page?: number): void;
}

const cosTabs: Tab[] = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

const COSContext = createContext<CosContextType>({
  activeTab: 0,
  setActiveTab: () => {},
  cosTabs: [],

  onHandleClearFilter: () => {},
  onHandleSubmitFilter: () => {},
  onHandleChangePage: () => {},
});

export const CosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { setFilter, status, setStatus, documentNo, setDocumentNo, dateFiled, setDateFiled, dateTransaction, setDateTransaction, requested, setRequested, setLoading, setPage } =
    useCOS();

  useEffect(() => {
    setLoading(true);
    setFilter("");
    setDateFiled([null, null]);
    setDateTransaction([null, null]);
    setDocumentNo("");
    setRequested("");
    setStatus([]);
    setPage(1);
  }, [activeTab]);

  const onHandleClearFilter = () => {
    setFilter("");
    setLoading(true);
    setDateFiled([null, null]);
    setDateTransaction([null, null]);
    setDocumentNo("");
    setRequested("");
    setStatus([]);
    setPage(1);
  };

  const onHandleSubmitFilter = () => {
    const document = documentNo && `DocumentNo=${documentNo}`;
    const request = requested && `Requested=${requested}`;
    const statusArray = status.map((id) => `DocStatusIds=${id}`).join("&");
    const date_transaction =
      dateTransaction[0] != null &&
      dateTransaction[1] != null &&
      `DateField=dateTransaction&DateFrom=${DateTimeUtils.getIsoDateFull(String(dateTransaction[0]))}&DateTo=${DateTimeUtils.getIsoDateFull(String(dateTransaction[1]))}`;
    const date_filed =
      dateFiled[0] != null && dateFiled[1] != null && `DateFrom=${DateTimeUtils.getIsoDateFull(String(dateFiled[0]))}&DateTo=${DateTimeUtils.getIsoDateFull(String(dateFiled[1]))}`;
    console.log(date_filed);
    const filterString = [document, request, statusArray, date_transaction].filter(Boolean).join("&");
    setFilter(filterString ? `${filterString}&` : "");
    setPage(1);
    setLoading(true);
  };

  const onHandleChangePage = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  return <COSContext.Provider value={{ activeTab, setActiveTab, cosTabs, onHandleClearFilter, onHandleSubmitFilter, onHandleChangePage }}>{children}</COSContext.Provider>;
};

export const useChangeOfSchedule = (): CosContextType => {
  const context = useContext(COSContext);
  if (!context) {
    throw new Error("useChangeOfSchedule must be use inside of the COSProvider");
  }

  return context;
};
