/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { RouteObject } from "react-router-dom";
import Attendance from "./Attendance";

const userRoutes: RouteObject = {
  path: "user",
  children: [{ path: "attendance", element: <Attendance /> }],
};

export default userRoutes;
