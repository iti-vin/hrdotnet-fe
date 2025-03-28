/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import LoanLedger from "./";

const loanLedgerRoutes: RouteObject = {
  path: "loan-ledger",
  element: <LoanLedger />,
  children: [{ index: true, element: <Navigate to="" /> }],
};

export default loanLedgerRoutes;
