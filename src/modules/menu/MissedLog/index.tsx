// React Modules
import { NavLink, Outlet } from "react-router-dom";
// Shared Modules
import { useLogoWidth } from "@shared/hooks/useWidth";
// Own Modules
import "./index.css";
import { Alert } from "./components/views";
import Dialog from "./components/dialog";

const missedLogTabs = [
  { label: "List", path: "list", index: 0 },
  { label: "Review", path: "review", index: 1 },
  { label: "Approve", path: "approve", index: 2 },
];

export default function MissedLog() {
  const { isLogowordVisible } = useLogoWidth();
  return (
    <>
      <title>Missed Log</title>
      <div
        className={`flex bg-[#559CDA] gap-5 py-2 fixed top-15 left-0 right-0 z-10 sm:justify-start  justify-center ${isLogowordVisible ? "sm:pl-0 md:pl-5 lg:pl-265" : "pl-23"}`}>
        {missedLogTabs.map((ml) => (
          <NavLink to={ml.path} key={ml.index} className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
            {ml.label}
          </NavLink>
        ))}
      </div>
      <div className="bg-white m-4 mt-16 -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
        <Outlet />
        <Alert />
        <Dialog />
      </div>
    </>
  );
}
