/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import MissedLog from "./";
import Request from "./pages/Request";
import Reviewal from "./pages/Reviewal";
import Approval from "./pages/Approval";
import Filings from "./pages/Filings";

//--- Missed Log Panel

const mlRoutes: RouteObject = {
  path: "missed-log",
  element: <MissedLog />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <Request /> },
    { path: "reviewal", element: <Reviewal /> },
    { path: "approval", element: <Approval /> },
    { path: "filings", element: <Filings /> },
  ],
};

export default mlRoutes;
