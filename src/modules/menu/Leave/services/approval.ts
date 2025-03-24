/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import apiClient from "@/services/api";

import { LeaveResponse } from "../models/response";
import { LeaveType } from "../assets/Types";
import { Batch, Single } from "../models/request";

const LEAVE_API_APPROVAL = "/filings/approvals/me/leave-filings";

export const LeaveServices = {
  getAllLeaveApproval: async (filters?: Record<string, any>, page?: Record<string, any>): Promise<LeaveResponse> => {
    const params = new URLSearchParams();

    Object.entries(filters!).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    Object.entries(page!).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    const response = await apiClient.get<LeaveResponse>(`${LEAVE_API_APPROVAL}?${params}`);
    return response.data;
  },

  getApprovalById: async (id: number): Promise<LeaveType> => {
    const response = await apiClient.get<LeaveType>(`${LEAVE_API_APPROVAL}/${id}`);
    return response.data;
  },

  singleApproveLeave: async (id: number, data: Single) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const response = await apiClient.post(`${LEAVE_API_APPROVAL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },

  batchApproveLeave: async (data: Batch) => {
    const response = await apiClient.post(`${LEAVE_API_APPROVAL}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
