/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import CTO from "./";
import { Request, Reviewal, Approval, Filings } from "./pages";

const ctoRoutes: RouteObject = {
  path: "compensatory-timeoff",
  element: <CTO />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <Request /> },
    { path: "reviewal", element: <Reviewal /> },
    { path: "approval", element: <Approval /> },
    { path: "filings", element: <Filings /> },
  ],
};

export default ctoRoutes;
