/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { createBrowserRouter } from "react-router-dom";

import Root from "@/layout/app/";
import AuthLayout from "@/layout/auth";

import Login from "@/modules/auth/Login";

import cosRoutes from "@/modules/menu/ChangeSchedule/routes";
import ctoRoutes from "@/modules/menu/CompensantoryTimeOff/routes";
import leaveRoutes from "@/modules/menu/Leave/routes";
import mlRoutes from "@/modules/menu/MissedLog/routes";
import obRoutes from "@/modules/menu/OfficialBusiness/routes";
import overtimeRoutes from "@/modules/menu/Overtime/routes";
import offsetRoutes from "@/modules/menu/Offset/routes";
// import loanLedgerRoutes from "@/modules/menu/LoanLedger/routes";
import { Dropzone } from "@shared/template";

export const router = createBrowserRouter([
  { element: <Root />, children: [cosRoutes, ctoRoutes, leaveRoutes, mlRoutes, obRoutes, overtimeRoutes, offsetRoutes] },
  { path: "auth", element: <AuthLayout />, children: [{ path: "login", element: <Login /> }] },
  { path: "hey", element: <Dropzone /> },
]);
