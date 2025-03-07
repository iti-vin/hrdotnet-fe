/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import OfficialBusiness from "./";

const obRoutes: RouteObject = {
  path: "official-business",
  element: <OfficialBusiness />,
  children: [{ index: true, element: <Navigate to="" /> }],
};

export default obRoutes;
