/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import apiService from "@/services/http";
import { PROFILE_URL } from "./url";
import { EmployeeWorkProfiles } from "../assets/Types";
import { EmployeeInformation } from "../assets/Personal.types";

export const ProfileServices = {
  getEmployeeWorkInfo: async (): Promise<EmployeeWorkProfiles> => {
    const response = await apiService.get<EmployeeWorkProfiles>(`${PROFILE_URL}/work-information`);
    return response;
  },

  getEmployeeInfo: async (): Promise<EmployeeInformation> => {
    const response = await apiService.get<EmployeeInformation>(PROFILE_URL);
    return response;
  },
};
