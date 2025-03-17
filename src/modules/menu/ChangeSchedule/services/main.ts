/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

// --- Axios Instance
import apiClient from "@/services/api";
// --- Models
import { Request, Single, Update } from "../models/request";
import { ChangeSchedule, Schedules } from "../models/response";
// --- Types
import { CosItems } from "../assets/Types";

const api = "/schedules/filings/me";

const CosServices = {
  getAllCosMe: async (filter?: string, page?: string): Promise<ChangeSchedule> => {
    const response = await apiClient.get<ChangeSchedule>(`${api}/change-of-schedules?${filter}SortBy=dateFrom&PageSize=15${page}`);
    return response.data;
  },

  getAllCosMeById: async (idOrGuid: number): Promise<CosItems> => {
    const response = await apiClient.get(`${api}/change-of-schedules/${idOrGuid}`);
    return response.data;
  },

  createCosRequest: async (data: Request): Promise<CosItems> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const response = await apiClient.post<CosItems>(`${api}/change-of-schedules`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCosRequest: async (data: Update, id: number): Promise<CosItems> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const response = await apiClient.post<CosItems>(`${api}/change-of-schedules/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  cancelCosRequest: async (data: Single, id: number): Promise<CosItems> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post<CosItems>(`${api}/change-of-schedules/${id}/cancel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getSchedules: async (): Promise<Schedules> => {
    const response = await apiClient.get<Schedules>(`/maintenance/schedules`);
    return response.data;
  },
};

export default CosServices;
