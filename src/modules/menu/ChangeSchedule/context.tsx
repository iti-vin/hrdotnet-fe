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
  handleCopy(): void;
  handlePaste(): void;
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
  handleCopy: () => {},
  handlePaste: () => {},
});

export const CosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setPage, storedPage, setLoading, setStoredPage, setStoredFilters, setScheduleItems } =
    useChangeOfScheduleStore();
  const onHandleSubmitFilter = (filterParams: Record<string, any>) => {
    setLoading(true);
    setStoredFilters({ ...filterParams });
  };

  const handleCopy = () => {
    const dateFrom = document.getElementById("date_from")?.innerText.trim() || "";
    const dateTo = document.getElementById("date_to")?.innerText.trim() || "";
    const reason = document.getElementById("reason")?.innerText.trim() || "";
    const referenceNo = document.getElementById("reference_no")?.innerText.trim() || "";

    const textToCopy = JSON.stringify({ dateFrom, dateTo, reason, referenceNo });

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy text!");
      });
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((clipboardText) => {
        try {
          const json = JSON.parse(clipboardText);
          const dateFrom = document.getElementById("date_from") as HTMLInputElement;
          const dateTo = document.getElementById("date_to") as HTMLInputElement;
          const reason = document.getElementById("reason") as HTMLInputElement;
          const referenceNo = document.getElementById("reference_no") as HTMLInputElement;

          if (json) {
            dateFrom.value = json.title || "";
            dateTo.value = json.body || "";
            reason.value = json.body || "";
            referenceNo.value = json.body || "";
          } else {
            // alert("Input elements not found!");
          }
        } catch (err) {
          console.error("Invalid JSON in clipboard:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard: ", err);
      });
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
        handleCopy,
        handlePaste,
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
