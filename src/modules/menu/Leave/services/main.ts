/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import apiClient from "@/services/api";

import { LeaveItems, LeaveResponse } from "../models/response";
import { Batch, ExtendedSingle, Single } from "../models/request";

const LEAVE_API = `/filings/me/leave-filings`;

export const LeaveServices = {
  getAllLeaveMe: async (filters?: Record<string, any>, status?: number[], page?: Record<string, any>): Promise<LeaveResponse> => {
    const params = new URLSearchParams();

    Object.entries(filters!).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    status!.forEach((id) => {
      if (id !== undefined && id !== null) {
        params.append("DocStatusIds", id.toString());
      }
    });

    Object.entries(page!).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    const response = await apiClient.get<LeaveResponse>(`${LEAVE_API}?${params}`);
    return response.data;
  },

  getLeaveById: async (id: number): Promise<LeaveItems> => {
    const response = await apiClient.get<LeaveItems>(`${LEAVE_API}${id}`);
    return response.data;
  },

  createLeaveRequest: async (data: any): Promise<LeaveItems> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post<LeaveItems>(`${LEAVE_API}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateLeaveRequest: async (id: number, data: ExtendedSingle) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post(`${LEAVE_API}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  cancelLeaveRequest: async (id: number, data: Single): Promise<LeaveItems> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post<LeaveItems>(`${LEAVE_API}/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  batchCancelLeave: async (data: Batch) => {
    const response = await apiClient.post(`${LEAVE_API}/cancel`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
