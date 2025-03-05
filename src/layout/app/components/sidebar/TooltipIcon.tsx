/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
//--- React Modules
import React from "react";
//--- Mantine Modules
import { Tooltip } from "@mantine/core";

export default function TooltipIcon({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Tooltip label={label} position="right-end" offset={{ crossAxis: 3, mainAxis: 10 }} arrowPosition="center" className="poppins" color="#559CDA" withArrow>
      {icon}
    </Tooltip>
  );
}
