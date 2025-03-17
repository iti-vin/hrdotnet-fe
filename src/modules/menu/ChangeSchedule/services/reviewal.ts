/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

// --- Axios Instance
import apiClient from "@/services/api";
// --- Models
import { Batch, Single } from "../models/request";
import { ChangeSchedule, CosItems } from "../models/response";

const REVIEWAL_API = "/schedules/filings/review/me";

export const CosServices = {
  getAllCosReviewal: async (filter?: string, page?: string): Promise<ChangeSchedule> => {
    const response = await apiClient.get(`${REVIEWAL_API}/change-of-schedules?${filter}SoryBy=dateFrom&PageSize=15${page}`);
    return response.data;
  },

  getAllCosReviewalById: async (id: string): Promise<ChangeSchedule> => {
    const response = await apiClient.get(`${REVIEWAL_API}/change-of-schedules/${id}`);
    return response.data;
  },

  singleReviewCos: async (data: Single, id: string | number) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post(`${REVIEWAL_API}/change-of-schedules/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.status);
    return response.data;
  },

  batchReviewCos: async (data: Batch) => {
    const response = await apiClient.post(`${REVIEWAL_API}/change-of-schedules`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  singleCancelCos: async (data: Single, id: string | number): Promise<CosItems> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const response = await apiClient.post<CosItems>(`/schedules/filings/me/change-of-schedules/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  batchCancelCos: async (data: Batch) => {
    const response = await apiClient.post(`/schedules/filings/me/change-of-schedules/cancel`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
