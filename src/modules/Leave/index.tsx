import { NavLink, Outlet } from "react-router-dom";
import LeaveDialog from '@/modules/Leave/component/LeaveDialog'
import './style.css'
import { LeaveStore } from "./LeaveStore";
export const Leave = () => {


  return (
    <div className="">
      <title>Leave</title>
      <div className="flex bg-[#559CDA] top-20 gap-5 px-4 py-2 ">
        <NavLink to="list" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
          List
        </NavLink>
        <NavLink to="ledger" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
          Ledger
        </NavLink>
        <NavLink to="review" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
          Review
        </NavLink>
        <NavLink to="approve" className={({ isActive }) => (isActive ? "activeLink" : "inactiveLink")}>
          Approve
        </NavLink>
      </div>
      <div>
        <Outlet />
        <LeaveDialog/>
      </div>
    </div>
  );
};

