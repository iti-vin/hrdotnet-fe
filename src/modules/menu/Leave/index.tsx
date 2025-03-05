import { NavLink, Outlet } from "react-router-dom";
import LeaveDialog from "@/modules/menu/Leave/component/LeaveDialog";
import "./style.css";

export const Leave = () => {
  const leavePanel = [
    { id: 1, name: "request", title: "My Request" },
    { id: 2, name: "ledger", title: "My Ledger" },
    { id: 3, name: "reviewal", title: "For Review" },
    { id: 4, name: "approval", title: "For Approval" },
    { id: 5, name: "filings", title: "Employee Filings" },
  ];
  return (
    <div className="">
      <title>Leave</title>
      <div className="w-full flex bg-[#559CDA] top-20 gap-5 px-4 py-2">
        {leavePanel.map((item) => (
          <NavLink key={item.id} to={item.name} className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
            {item.title}
          </NavLink>
        ))}
      </div>
      <div>
        <Outlet />
        <LeaveDialog />
      </div>
    </div>
  );
};
