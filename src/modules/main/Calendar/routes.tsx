/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Navigate, RouteObject } from "react-router-dom";

import Calendar from "./";
import Personal from "./pages/Personal";
import Team from "./pages/Team";

const calendarRoutes: RouteObject = {
  path: "calendar",
  element: <Calendar />,
  children: [
    { index: true, element: <Navigate to="personal" /> },
    { path: "personal", element: <Personal /> },
    { path: "team", element: <Team /> },
  ],
};

export default calendarRoutes;
calendarRoutes;
