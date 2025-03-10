/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import CTO from "./";

const ctoRoutes: RouteObject = {
  path: "compensatory-timeoff",
  element: <CTO />,
  children: [{ index: true, element: <Navigate to="" /> }],
};

export default ctoRoutes;
