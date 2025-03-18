/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//---
import { create } from "zustand";
//--- Model Response
import { CosItems } from "../models/response";
//--- Types
import { COSStates, Schedules } from "../assets/Types";
//---
import { Items, SchedulesValues } from "../assets/Values";

const useCOS = create<COSStates>((set) => ({
  //Loading
  loading: true,
  setLoading: (loading: boolean) => set({ loading: loading }),

  error: "Failed to Fetch Data",
  setError: (error: string) => set({ error: error }),
  page: 1,
  setPage: (page: number) => set({ page: page }),

  // Modals
  onViewDetails: false,
  setOnViewDetails: (view: boolean) => set({ onViewDetails: view }),
  onNewFiling: false,
  setOnNewFiling: (filing: boolean) => set({ onNewFiling: filing }),

  // Details
  viewItems: Items,
  setViewItems: (items: CosItems) => set({ viewItems: items }),
  // Schedules Items
  scheduleItems: SchedulesValues,
  setScheduleItems: (items: Schedules) => set({ scheduleItems: items }),
  // Schedules List
  schedList: [],
  setSchedList: (items: { id: number; name: string; isRestDay: boolean }[]) => set({ schedList: items }),

  // Alert Handle
  cancelAlert: false,
  setCancelAlert: (cancel: boolean) => set({ cancelAlert: cancel }),
  endorseAlert: false,
  setEndorseAlert: (endorse: boolean) => set({ endorseAlert: endorse }),
  approveAlert: false,
  setApproveAlert: (approve: boolean) => set({ approveAlert: approve }),

  errorAlert: false,
  setErrorAlert: (error: boolean) => set({ errorAlert: error }),

  // Drawer Filter
  drawerFilter: false,
  setDrawerFilter: (filter: boolean) => set({ drawerFilter: filter }),
  filter: "",
  setFilter: (filter: string) => set({ filter: filter }),

  // Filters
  documentNo: "",
  setDocumentNo: (docu: string) => set({ documentNo: docu }),
  dateTransaction: [null, null],
  setDateTransaction: (value: [Date | null, Date | null]) => set({ dateTransaction: value }),
  requested: "",
  setRequested: (req: string) => set({ requested: req }),
  dateFiled: [null, null],
  setDateFiled: (value: [Date | null, Date | null]) => set({ dateFiled: value }),
  status: [],
  setStatus: (status: number[]) => set({ status: status }),

  processedBy: "",
  setProcessedBy: (proc: string) => set({ processedBy: proc }),
  branchCode: 0,
  setBranchCode: (branch: number) => set({ branchCode: branch }),
  employeeCode: 0,
  setEmployeeCode: (employee: number) => set({ employeeCode: employee }),
  employeeName: "",
  setEmployeeName: (name: string) => set({ employeeName: name }),
}));

export default useCOS;
