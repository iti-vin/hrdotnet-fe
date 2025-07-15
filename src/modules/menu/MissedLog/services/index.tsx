/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { BatchMissedLogI } from "../assets/types";
import { MissedLogResponse } from "../models/response";
import { APPROVAL_URL, MAIN_URL, REVIEWAL_URL } from "./url";
import apiService from "@/services/http";

export const MissedLogServices = {
  getAllMyMissedLog: async (filters?: Record<string, any>): Promise<MissedLogResponse> => {
    const params = new URLSearchParams();

    // Convert arrays to separate query params
    Object.entries(filters!).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()));
      } else {
        params.append(key, value.toString());
      }
    });
    const response = await apiService.get<MissedLogResponse>(`${MAIN_URL}`, { params });
    return response;
  },

  getAllForApprovalML: async (filters?: Record<string, any>): Promise<MissedLogResponse> => {
    const params = new URLSearchParams();

    // Convert arrays to separate query params
    Object.entries(filters!).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()));
      } else {
        params.append(key, value.toString());
      }
    });
    const response = await apiService.get<MissedLogResponse>(`${APPROVAL_URL}`, { params });
    return response;
  },

  getAllForReviewalML: async (filters?: Record<string, any>): Promise<MissedLogResponse> => {
    const params = new URLSearchParams();

    // Convert arrays to separate query params
    Object.entries(filters!).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()));
      } else {
        params.append(key, value.toString());
      }
    });
    const response = await apiService.get<MissedLogResponse>(`${REVIEWAL_URL}`, { params });
    return response;
  },

  getAllForFilingsML: async (filters?: Record<string, any>): Promise<MissedLogResponse> => {
    const params = new URLSearchParams();

    // Convert arrays to separate query params
    Object.entries(filters!).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()));
      } else {
        params.append(key, value.toString());
      }
    });
    const response = await apiService.get<MissedLogResponse>(`${APPROVAL_URL}`, { params });
    return response;
  },

  createMissedLogRequest: async (formData: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  updateMissedLogRequest: async (id: number, formData: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  cancelMissedLogRequest: async (id: number, formData: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleEndorseMissedLog: async (id: number, formData: Record<string, any>) => {
    const response = await apiService.post(`${REVIEWAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleApproveMissedLog: async (id: number, formData: Record<string, any>) => {
    const response = await apiService.post(`${APPROVAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  batchCancelMissedLog: async (formData: Record<string, any>): Promise<BatchMissedLogI> => {
    const response = await apiService.post<BatchMissedLogI>(`${MAIN_URL}/cancel`, formData);
    return response;
  },

  batchApproveMissedLog: async (formData: Record<string, any>): Promise<BatchMissedLogI> => {
    const response = await apiService.post<BatchMissedLogI>(`${APPROVAL_URL}`, formData);
    return response;
  },

  batchEndorseMissedLog: async (formData: Record<string, any>): Promise<BatchMissedLogI> => {
    const response = await apiService.post<BatchMissedLogI>(`${REVIEWAL_URL}`, formData);
    return response;
  },
};
