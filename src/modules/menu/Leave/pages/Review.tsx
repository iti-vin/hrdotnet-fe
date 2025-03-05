import React, { useEffect, useState } from "react";
import "mantine-datatable/styles.layer.css";
import LeaveHeader from "@/modules/menu/Leave/component/LeaveHeader";
import LeaveTable from "@/modules/menu/Leave/component/LeaveTable";
import { LeaveStore } from "@/modules/menu/Leave/LeaveStore";
import { Stack } from "@mantine/core";

export default function Review() {
  const { SET_ACTIVE_TAB } = LeaveStore();

  useEffect(() => {
    SET_ACTIVE_TAB("review");
  }, []);

  return (
    <div className="bg-white m-4  -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
      <Stack className="h-full">
        <LeaveHeader />
        <LeaveTable />
      </Stack>
    </div>
  );
}
