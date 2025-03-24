/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";
import COS from "./";
//--- COS Panel
import Request from "./components/pages/Request";
import Reviewal from "./components/pages/Reviewal";
import Approval from "./components/pages/Approval";
import Filings from "./components/pages/Filings";

const cosRoutes: RouteObject = {
  path: "change-schedule",
  element: <COS />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <Request /> },
    { path: "reviewal", element: <Reviewal /> },
    { path: "approval", element: <Approval /> },
    { path: "filings", element: <Filings /> },
  ],
};

export default cosRoutes;
