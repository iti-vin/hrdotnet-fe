/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Navigate } from "react-router-dom";

import { Overtime } from ".";

const overtimeRoutes = {
  path: "overtime",
  element: <Overtime />,
  children: [{ index: true, element: <Navigate to="request" /> }],
};

export default overtimeRoutes;
