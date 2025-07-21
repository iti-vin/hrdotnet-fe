/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { RouteObject } from "react-router-dom";
import Attendance from "./Attendance";
import Profile from "./Profile";
import AccountSettings from "./AccountSettings";

const userRoutes: RouteObject = {
  path: "user",
  children: [
    { path: "attendance", element: <Attendance /> },
    { path: "profile", element: <Profile /> },
    { path: "account-settings", element: <AccountSettings /> },
  ],
};

export default userRoutes;
