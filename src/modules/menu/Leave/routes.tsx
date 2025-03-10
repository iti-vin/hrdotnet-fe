/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate } from "react-router-dom";

import { Leave } from ".";

import List from "./pages/List";
import Ledger from "./pages/ledger";
import Review from "./pages/Review";
import Approve from "./pages/Approve";

const leaveRoutes = {
  path: "leave",
  element: <Leave />,
  children: [
    { index: true, element: <Navigate to="request" /> },
    { path: "request", element: <List /> },
    { path: "ledger", element: <Ledger /> },
    { path: "reviewal", element: <Review /> },
    { path: "approval", element: <Approve /> },
    { path: "filings", element: <></> },
  ],
};

export default leaveRoutes;
