import { useEffect } from "react";
import { Stack } from "@mantine/core";
import "mantine-datatable/styles.layer.css";
import { LeaveStore } from "@/modules/menu/Leave/LeaveStore";
import LeaveHeader from "../component/LeaveHeader";
import LeaveTable from "../component/LeaveTable";

export default function List() {
  const { SET_ACTIVE_TAB } = LeaveStore();

  useEffect(() => {
    SET_ACTIVE_TAB("list");
  }, []);

  return (
    <div className="bg-white m-4  -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
      <Stack className="h-full w-full">
        <LeaveHeader />
        <LeaveTable />
      </Stack>
    </div>
  );
}
