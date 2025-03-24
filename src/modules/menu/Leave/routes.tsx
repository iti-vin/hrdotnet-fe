/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate } from "react-router-dom";

import Leave from ".";
import Ledger from "./pages/Ledger";
import Request from "./pages/Request";
import Reviewal from "./pages/Reviewal";
import Approval from "./pages/Approval";
import Filings from "./pages/Filings";

const leaveRoutes = {
  path: "leave",
  element: <Leave />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <Request /> },
    { path: "ledger", element: <Ledger /> },
    { path: "reviewal", element: <Reviewal /> },
    { path: "approval", element: <Approval /> },
    { path: "filings", element: <Filings /> },
  ],
};

export default leaveRoutes;
