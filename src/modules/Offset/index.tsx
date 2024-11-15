import { NavLink, Outlet } from "react-router-dom";
import { useLogoWidth } from "@shared/hooks/useWidth";
import "./index.css";

const offsetTabs = [
  { label: "List", path: "list", index: 0 },
  { label: "Review", path: "review", index: 1 },
  { label: "Approve", path: "approve", index: 2 },
];

export const Offset = () => {
  const { isLogowordVisible } = useLogoWidth();
  return (
    <>
      <title>Offset</title>
      <div
        className={`flex bg-[#559CDA] gap-5 py-2 fixed top-15 left-0 right-0 z-10 sm:justify-start  justify-center ${
          isLogowordVisible ? "sm:pl-0 md:pl-5 lg:pl-265" : "pl-23"
        }`}
      >
        {offsetTabs.map((off) => (
          <NavLink
            to={off.path}
            key={off.index}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            {off.label}
          </NavLink>
        ))}
      </div>
      <div className="bg-white m-4 mt-16 -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bofftom-0">
        <Outlet />
      </div>
    </>
  );
};
