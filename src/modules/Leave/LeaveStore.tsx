import { create } from "zustand";

interface LeaveState {
  ACTIVE_TAB: string;
  ACTION: string;
  ALERT: string;
  SELECTED_DATA: any;
  SELECTED_LEAVE_TYPE: any;
  
  SET_ACTION: (action: string) => void;
  SET_ACTIVE_TAB: (active_tab: string) => void;
  SET_ALERT: (alert: string) => void;
  SET_SELECTED_DATA: (active_tab: any) => void;
  SET_SELECTED_LEAVE_TYPE: (selected_leave_type: any) => void;
}

const LeaveStore = create<LeaveState>((set) => ({
  ACTIVE_TAB: 'list',
  ACTION: '',
  ALERT: '',
  SELECTED_DATA: {},
  SELECTED_LEAVE_TYPE: {},

  SET_ACTION: (action) => set({ ACTION: action }),
  SET_ACTIVE_TAB: (active_tab) => set({ ACTIVE_TAB: active_tab }),
  SET_ALERT: (alert) => set({ ALERT: alert }),
  SET_SELECTED_DATA: (selected_data) => set({ SELECTED_DATA: selected_data }),
  SET_SELECTED_LEAVE_TYPE: (selected_leave_type) => set({ SELECTED_LEAVE_TYPE: selected_leave_type }),
}));

export { LeaveStore };
