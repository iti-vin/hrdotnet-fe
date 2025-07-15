/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import apiService from "@/services/http";
import { MaintenanceBranch, MaintenanceLocation, OfficialBusinessResponse } from "../models/response";
import { APPROVAL_URL, MAIN_URL, REVIEWAL_URL } from "./url";
import { filtersToParamsQuery } from "@shared/utils/Params";

export const OfficialBusinessServices = {
  getAllMyOB: async (filters?: Record<string, any>): Promise<OfficialBusinessResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OfficialBusinessResponse>(MAIN_URL, { params });
    return response;
  },

  getAllForApprovalOB: async (filters?: Record<string, any>): Promise<OfficialBusinessResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OfficialBusinessResponse>(APPROVAL_URL, { params });
    return response;
  },

  getAllForReviewalOB: async (filters?: Record<string, any>): Promise<OfficialBusinessResponse> => {
    const params = filtersToParamsQuery(filters);
    const response = await apiService.get<OfficialBusinessResponse>(REVIEWAL_URL, { params });
    return response;
  },

  createOBRequest: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  updateOBRequest: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleCancelOB: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleEndorseOB: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${REVIEWAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  singleApproveOB: async (id: number, formData?: Record<string, any>) => {
    const response = await apiService.post(`${APPROVAL_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  batchCancelOB: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${MAIN_URL}/cancel`, formData);
    return response;
  },

  batchEndorseOB: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${REVIEWAL_URL}`, formData);
    return response;
  },

  batchApproveOB: async (formData?: Record<string, any>) => {
    const response = await apiService.post(`${APPROVAL_URL}`, formData);
    return response;
  },

  getAllBranch: async (id: string): Promise<MaintenanceBranch> => {
    const response = await apiService.get<MaintenanceBranch>(`/maintenance/branches?Location=${id}`);
    return response;
  },

  getAllLocation: async (): Promise<MaintenanceLocation> => {
    const response = await apiService.get<MaintenanceLocation>("/maintenance/locations");
    return response;
  },
};
