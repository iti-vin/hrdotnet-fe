/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { filtersToParamsQuery } from "@shared/utils/Params";
import { OvertimeItems, OvertimeResponse, Schedules } from "../models/response";
import apiService from "@/services/http";
import { APPROVAL_URL, MAIN_URL, REVIEWAL_URL } from "./url";

export const OvertimeServices = {
  getAllMyOT: async (filters?: Record<string, any>): Promise<OvertimeResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OvertimeResponse>(MAIN_URL, { params });
    return response;
  },

  getAllForApprovalOT: async (filters?: Record<string, any>): Promise<OvertimeResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OvertimeResponse>(APPROVAL_URL, { params });
    return response;
  },

  getAllForReviewalOT: async (filters?: Record<string, any>): Promise<OvertimeResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OvertimeResponse>(REVIEWAL_URL, { params });
    return response;
  },

  getAllFilingsOT: async (filters?: Record<string, any>): Promise<OvertimeResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OvertimeResponse>(APPROVAL_URL, { params });
    return response;
  },

  getMyOTById: async (id: number | string): Promise<OvertimeItems> => {
    const response = await apiService.get<OvertimeItems>(`${MAIN_URL}/${id}`);
    return response;
  },

  getReviewalOTById: async (id: number): Promise<OvertimeItems> => {
    const response = await apiService.get<OvertimeItems>(`${REVIEWAL_URL}/${id}`);
    return response;
  },

  getApprovalOTById: async (id: number): Promise<OvertimeItems> => {
    const response = await apiService.get<OvertimeItems>(`${APPROVAL_URL}/${id}`);
    return response;
  },

  createOTRequest: async (formData: Record<string, any>) => {
    const response = await apiService.post(MAIN_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },

  updateOTRequest: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleCancelOT: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleEndorseOT: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${REVIEWAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleApproveOT: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${APPROVAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  batchCancelOT: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/cancel`, formData);
    return response;
  },

  batchEndorseOT: async (formData?: Record<string, any>) => {
    const response = await apiService.post(REVIEWAL_URL, formData);
    return response;
  },

  batchApproveOT: async (formData?: Record<string, any>) => {
    const response = await apiService.post(APPROVAL_URL, formData);
    return response;
  },

  getFlexibleSchedules: async (formData: Record<string, any>, date?: Record<string, any>) => {
    const params = filtersToParamsQuery(date);
    const response = await apiService.post("/schedules/me/flexible-schedule", formData, { params });
    return response;
  },

  getProcessedSchedules: async (date?: Record<string, any>): Promise<Schedules> => {
    const params = filtersToParamsQuery(date);
    const response = await apiService.get<Schedules>("/schedules/me/processed-schedule", { params });
    return response;
  },

  getTimeRecords: async (date: Record<string, any>) => {
    const params = filtersToParamsQuery(date);
    const response = await apiService.get("/employee-management/me/time-records/processed-time-records", { params });
    return response;
  },
};
