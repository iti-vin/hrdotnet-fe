/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import MissedLog from "./";

//--- Missed Log Panel

const mlRoutes: RouteObject = {
  path: "missed-log",
  element: <MissedLog />,
  children: [{ index: true, element: <Navigate to="/" /> }],
};

export default mlRoutes;
