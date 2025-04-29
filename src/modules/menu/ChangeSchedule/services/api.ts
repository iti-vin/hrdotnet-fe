/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { filtersToParamsQuery } from "@shared/utils/Params";
import { ChangeSchedule, CosItems } from "../models/response";
import apiService from "@/services/http";
import { APPROVAL_URL, MAIN_URL, REVIEWAL_URL } from "./url";
import { Schedules } from "../assets/Types";

export const CosServices = {
  getAllMyCOS: async (filters?: Record<string, any>): Promise<ChangeSchedule> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<ChangeSchedule>(MAIN_URL, { params });
    return response;
  },

  getAllCosReviewal: async (filters?: Record<string, any>): Promise<ChangeSchedule> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<ChangeSchedule>(REVIEWAL_URL, { params });
    return response;
  },

  getAllCosApproval: async (filters?: Record<string, any>): Promise<ChangeSchedule> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<ChangeSchedule>(APPROVAL_URL, { params });
    return response;
  },

  getMyCOSById: async (id: number | string): Promise<CosItems> => {
    const response = await apiService.get<CosItems>(`${MAIN_URL}/${id}`);
    return response;
  },

  getReviewalCOSById: async (id: number): Promise<CosItems> => {
    const response = await apiService.get<CosItems>(`${REVIEWAL_URL}/${id}`);
    return response;
  },

  getApprovalCOSById: async (id: number): Promise<CosItems> => {
    const response = await apiService.get<CosItems>(`${APPROVAL_URL}/${id}`);
    return response;
  },

  createCOSRequest: async (formData: Record<string, any>) => {
    const response = await apiService.post(MAIN_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },

  updateCOSRequest: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleCancelCOS: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleEndorseCOS: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${REVIEWAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleApproveCOS: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${APPROVAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  batchCancelCOS: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/cancel`, formData);
    return response;
  },

  batchEndorseCOS: async (formData?: Record<string, any>) => {
    const response = await apiService.post(REVIEWAL_URL, formData);
    return response;
  },

  batchApproveCOS: async (formData?: Record<string, any>) => {
    const response = await apiService.post(APPROVAL_URL, formData);
    return response;
  },

  getSchedules: async (): Promise<Schedules> => {
    const response = await apiService.get<Schedules>(`/maintenance/schedules`);
    return response;
  },
};
