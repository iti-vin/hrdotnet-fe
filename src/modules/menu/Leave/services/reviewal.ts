/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import apiClient from "@/services/api";

import { LeaveResponse } from "../models/response";
import { Batch, Single } from "../models/request";

const LEAVE_API_REVIEWAL = "/filings/review/me/leave-filings";

export const LeaveServices = {
  getAllLeaveReview: async (filters?: Record<string, any>, page?: Record<string, any>): Promise<LeaveResponse> => {
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
    const response = await apiClient.get<LeaveResponse>(`${LEAVE_API_REVIEWAL}?${params}`);
    return response.data;
  },

  singleReviewLeave: async (id: number, data: Single) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post(`${LEAVE_API_REVIEWAL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  batchEndorseLeave: async (data: Batch) => {
    const response = await apiClient.post(`${LEAVE_API_REVIEWAL}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
