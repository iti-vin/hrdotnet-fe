/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Navigate, Outlet } from "react-router-dom";

/**
 * @function ProtectedModule
 * @description restricting user to access the modules if not authenticated
 * @returns {JSX.Element} if not authenticate direct to auth else direct to module
 */
export const ProtectedModule = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  return accessToken ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

/**
 * @function Authentication
 * @description restricting user to access the modules if not authenticated
 * @returns {JSX.Element} if not authenticate direct to auth else direct to module
 */
export const Authentication = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  return accessToken ? <Navigate to="/change-schedule" replace /> : <Outlet />;
};
