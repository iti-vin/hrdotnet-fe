import { create } from "zustand";

// dummy data
import data from "@shared/services/missedlog.json";
import { SelectedData } from "../assets/types";
import { connect } from "@shared/hooks/useAxios";

const defaultSelectedData: SelectedData = {
  branchCode: "",
  code: "", // Assuming code is a string based on your provided data
  dateFiled: "",
  dateTransaction: "",
  documentNo: "",
  filingStatus: "",
  logTime: "",
  logType: "",
  name: "",
  reason: "",
  sched: "",
};

interface MissedLogProps {
  items: any;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  activeTab: string;
  selectedData: any;
  alert: string;
  action: string;
  // fetchData: () => Promise<void>;
  // loading: boolean;

  setSelectedData: (selected_items: any) => void;
  setActiveTab: (activeTab: string) => void;
  setAlert: (alert: string) => void;
  setAction: (action: string) => void;
}

const useML = create<MissedLogProps>((set) => ({
  items: data.items,
  page: data.page,
  pageSize: data.pageSize,
  pageCount: data.pageCount,
  total: data.total,
  selectedData: defaultSelectedData,
  activeTab: "",
  alert: "",
  action: "",
  // loading: false,
  // fetchData: async () => {
  //   set({ loading: true });
  //   try {
  //     const response = await connect(
  //       "GET",
  //       `${process.env.REQUEST}/filings/me/missed-logs`,
  //       "application/json"
  //     );
  //     console.log(response);
  //     set({ loading: false });
  //   } catch (error) {
  //     set({ loading: false });
  //   }
  // },

  setSelectedData: (selected_items: any) => set({ selectedData: selected_items }),
  setActiveTab: (activeTab: string) => set({ activeTab }),
  setAlert: (alert: string) => set({ alert }),
  setAction: (action: string) => set({ action }),
}));

export { useML };
