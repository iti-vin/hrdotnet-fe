/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import Offset from "./";

const offsetRoutes: RouteObject = {
  path: "offset",
  element: <Offset />,
  children: [{ index: true, element: <Navigate to="" /> }],
};

export default offsetRoutes;
