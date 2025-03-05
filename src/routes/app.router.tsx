/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layout/auth";

import Login from "@/modules/auth/Login";

import overtimeRoutes from "@/modules/menu/Overtime/routes";
import cosRoutes from "@/modules/menu/ChangeSchedule/assets/Routes";

import Root from "@/layout/app/";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      cosRoutes,
      // ctoRoutes,
      // leaveRoutes,
      // mlRoutes,
      // obRoutes,
      overtimeRoutes,
      // offsetRoutes,
      // ctoRoutes,
      // loanLedgerRoutes
    ],
  },
  { path: "auth", element: <AuthLayout />, children: [{ path: "login", element: <Login /> }] },
]);
