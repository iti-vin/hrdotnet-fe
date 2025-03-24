import { create } from "zustand";
import { LeaveItemsValues } from "../assets/Values";
import { LeaveItems } from "../models/response";

type FilterState = Record<string, any>;

interface LeaveProps {
  activeTab: number;
  setActiveTab(tab: number): void;
  // Modals
  openDialog: string;
  setOpenDialog(dialog: string): void;
  openAlert: string;
  setOpenAlert(alert: string): void;

  leaveType: { id: number; name: string; code: string }[];
  setLeaveType(type: { id: number; name: string; code: string }[]): void;
  leaveOption: { id: number; name: string; type: string; amount: string }[];
  setLeaveOption(type: { id: number; name: string; type: string; amount: string }[]): void;

  time: string;
  setTime(time: string): void;

  viewItems: LeaveItems;
  setViewItems(items: LeaveItems): void;

  dateFiled: [Date | null, Date | null];
  setDateFiled(newValue: [Date | null, Date | null]): void;

  selectedRecords: LeaveItems[];
  setSelectedRecords(data: LeaveItems[]): void;

  error: string;
  setError(err: string): void;
  page: number;
  setPage(page: number): void;

  loading: boolean;
  setLoading(load: boolean): void;

  storedFilters: FilterState;
  setStoredFilters(filters: FilterState): void;

  storedPage: FilterState;
  setStoredPage(page: FilterState): void;

  twoDate: [Date | null, Date | null];
  setTwoDate(date: [Date | null, Date | null]): void;
  status: number[];
  setStatus(status: number[]): void;

  dataFilter: FilterFormValues;
  setDataFilter(data: FilterFormValues): void;
}

const useLeaveStore = create<LeaveProps>((set) => ({
  activeTab: 0,
  setActiveTab: (tab: number) => set({ activeTab: tab }),

  // Modals
  openDialog: "",
  setOpenDialog: (dialog: string) => set({ openDialog: dialog }),
  openAlert: "",
  setOpenAlert: (alert: string) => set({ openAlert: alert }),

  leaveType: [],
  setLeaveType: (type: { id: number; name: string; code: string }[]) => set({ leaveType: type }),
  leaveOption: [],
  setLeaveOption: (option: { id: number; name: string; type: string; amount: string }[]) => set({ leaveOption: option }),

  time: "",
  setTime: (time: string) => set({ time: time }),

  viewItems: LeaveItemsValues,
  setViewItems: (items: LeaveItems) => set({ viewItems: items }),

  dateFiled: [new Date()!, new Date()!],
  setDateFiled: (newValue: [Date | null, Date | null]) => set({ dateFiled: newValue }),
  selectedRecords: [],
  setSelectedRecords: (records: LeaveItems[]) => set({ selectedRecords: records }),

  error: "",
  setError: (err: string) => set({ error: err }),
  page: 1,
  setPage: (page: number) => set({ page: page }),

  loading: true,
  setLoading: (load: boolean) => set({ loading: load }),

  storedFilters: {},
  setStoredFilters: (filter: FilterState) => set({ storedFilters: filter }),
  storedPage: {},
  setStoredPage: (page: FilterState) => set({ storedPage: page }),

  twoDate: [null, null],
  setTwoDate: (date: [Date | null, Date | null]) => set({ twoDate: date }),
  status: [],
  setStatus: (status: number[]) => set({ status: status }),

  dataFilter: {
    DocumentNo: null,
    LeaveType: null,
    DateField: null,
    DateFrom: null,
    DateTo: null,
    LeaveParameter: null,
  },
  setDataFilter: (data: FilterFormValues) => set({ dataFilter: data }),
}));

export default useLeaveStore;

type FilterFormValues = {
  DocumentNo: string | null;
  LeaveType: string | null;
  DateField: string | null;
  DateFrom: string | null;
  DateTo: string | null;
  LeaveParameter: string | null;
};
