import apiClient from "@/services/api";
import { LeaveLedgerResponse, LeaveOptionsParameter } from "../models/response";

export const LeaveLedgerServices = {
  getLeaveOption: async (): Promise<LeaveOptionsParameter> => {
    const response = await apiClient.get<LeaveOptionsParameter>("/leave-management/maintenance/leave-options");
    return response.data;
  },

  getLeaveParameter: async (): Promise<LeaveOptionsParameter> => {
    const response = await apiClient.get<LeaveOptionsParameter>("/leave-management/maintenance/leave-parameters");
    return response.data;
  },

  getLeaveLedger: async (): Promise<LeaveLedgerResponse> => {
    const response = await apiClient.get<LeaveLedgerResponse>("/leave-management/me/leave-ledgers?LeaveParameterId=1&BusinessYear=2024");
    return response.data;
  },
};
