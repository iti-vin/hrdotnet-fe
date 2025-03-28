/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import OfficialBusiness from "./";
import Request from "./pages/Request";
import Reviewal from "./pages/Reviewal";
import Approval from "./pages/Approval";
import Filings from "./pages/Filings";

const obRoutes: RouteObject = {
  path: "official-business",
  element: <OfficialBusiness />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <Request /> },
    { path: "reviewal", element: <Reviewal /> },
    { path: "approval", element: <Approval /> },
    { path: "filings", element: <Filings /> },
  ],
};

export default obRoutes;
