/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useAuthGlobalStore } from "@shared/store/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const authToken = useAuthGlobalStore((state) => state.token);
  if (!authToken) return null;

  const jwt = jwtDecode<JwtPayload>(authToken);

  if (jwt && jwt.exp! * 1000 < Date.now()) {
    useAuthGlobalStore.getState().clear();
    console.log("Token expired and cleared");
  }

  if (jwt === null) {
    return false;
  } else {
    return true;
  }
};

/**
 * @function ProtectedModule
 * @description restricting user to access the modules if not authenticated
 * @returns {JSX.Element} if not authenticate direct to auth else direct to module
 */
export const ProtectedModule = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

/**
 * @function ProtectedModule
 * @description restricting user to access the modules if not authenticated
 * @returns {JSX.Element} if not authenticate direct to auth else direct to module
 */
export const Authentication = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
