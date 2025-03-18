/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { PropsWithChildren } from "react";
import "./index.css";

import { useLogoWidth } from "@shared/hooks/useWidth";

export default function PanelNav({ children }: PropsWithChildren) {
  const { isLogowordVisible } = useLogoWidth();

  return <div className={`panel-container ${isLogowordVisible ? "sm:pl-0 md:pl-5 lg:pl-265" : "pl-23"} select-none`}>{children}</div>;
}
