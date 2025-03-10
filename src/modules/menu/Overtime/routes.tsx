/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Navigate } from "react-router-dom";

import { Overtime } from ".";
import Request from "./pages/Request";
import Reviewal from "./pages/Reviewal";
import Approval from "./pages/Approval";

const overtimeRoutes = {
  path: "overtime",
  element: <Overtime />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <Request /> },
    { path: "reviewal", element: <Reviewal /> },
    { path: "approval", element: <Approval /> },
    { path: "filings", element: <></> },
  ],
};

export default overtimeRoutes;
