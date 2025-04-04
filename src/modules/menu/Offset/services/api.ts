/**
 * @version    HRDOFFNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { filtersToParamsQuery } from "@shared/utils/Params";
import apiService from "@/services/http";
import { APPROVAL_URL, MAIN_URL, REVIEWAL_URL } from "./url";
import { OffsetResponse } from "../models/response";

export const OffsetServices = {
  getAllMyOFF: async (filters?: Record<string, any>): Promise<OffsetResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OffsetResponse>(MAIN_URL, { params });
    return response;
  },

  getAllForApprovalOFF: async (filters?: Record<string, any>): Promise<OffsetResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OffsetResponse>(APPROVAL_URL, { params });
    return response;
  },

  getAllForReviewalOFF: async (filters?: Record<string, any>): Promise<OffsetResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OffsetResponse>(REVIEWAL_URL, { params });
    return response;
  },

  getAllFilingsOFF: async (filters?: Record<string, any>): Promise<OffsetResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OffsetResponse>(APPROVAL_URL, { params });
    return response;
  },

  getMyOFFById: async (id: number | string): Promise<any> => {
    const response = await apiService.get<any>(`${MAIN_URL}/${id}`);
    return response;
  },

  getReviewalOFFById: async (id: number): Promise<any> => {
    const response = await apiService.get<any>(`${REVIEWAL_URL}/${id}`);
    return response;
  },

  getApprovalOFFById: async (id: number): Promise<any> => {
    const response = await apiService.get<any>(`${APPROVAL_URL}/${id}`);
    return response;
  },

  createOFFRequest: async (formData: Record<string, any>) => {
    const response = await apiService.post(MAIN_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },

  updateOFFRequest: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleCancelOFF: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleEndorseOFF: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${REVIEWAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleApproveOFF: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${APPROVAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  batchCancelOFF: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/cancel`, formData);
    return response;
  },

  batchEndorseOFF: async (formData?: Record<string, any>) => {
    const response = await apiService.post(REVIEWAL_URL, formData);
    return response;
  },

  batchApproveOFF: async (formData?: Record<string, any>) => {
    const response = await apiService.post(APPROVAL_URL, formData);
    return response;
  },

  getFlexibleSchedules: async (formData: Record<string, any>, date?: Record<string, any>) => {
    const params = filtersToParamsQuery(date);
    const response = await apiService.post("/schedules/me/flexible-schedule", formData, { params });
    return response;
  },

  getProcessedSchedules: async (date?: Record<string, any>): Promise<any> => {
    const params = filtersToParamsQuery(date);
    const response = await apiService.get<any>("/schedules/me/processed-schedule", { params });
    return response;
  },

  getTimeRecords: async (date: Record<string, any>) => {
    const params = filtersToParamsQuery(date);
    const response = await apiService.get("/employee-management/me/time-records/processed-time-records", { params });
    return response;
  },
};
