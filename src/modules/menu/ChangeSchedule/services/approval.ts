/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

// --- Axios Instance
import apiClient from "@/services/api";
// --- Models
import { Batch, Single } from "../models/request";
import { ChangeSchedule, CosItems } from "../models/response";

const approvalApi = "/schedules/filings/approvals/me";

export const CosServices = {
  getAllCosApproval: async (filter?: string, page?: string): Promise<ChangeSchedule> => {
    const response = await apiClient.get(`${approvalApi}/change-of-schedules?${filter}SortBy=dateFrom&PageSize=15${page}`);
    return response.data;
  },

  getAllCosApprovalById: async (id: string): Promise<ChangeSchedule> => {
    const response = await apiClient.get(`${approvalApi}/change-of-schedules/${id}`);
    return response.data;
  },

  singleApprovalCos: async (data: Single, id: string | number): Promise<CosItems> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const response = await apiClient.post<any>(`${approvalApi}/change-of-schedules/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  batchApprovalCos: async (data: Batch) => {
    const response = await apiClient.post<any>(`${approvalApi}/change-of-schedules`, data);
    return response.data;
  },

  singleCancelCos: async (data: Single, id: string | number): Promise<CosItems> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const response = await apiClient.post<any>(`/schedules/filings/me/change-of-schedules/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  batchCancelCos: async (data: Batch) => {
    const response = await apiClient.post<any>(`/schedules/filings/me/change-of-schedules/cancel`, data);
    return response.data;
  },
};
