/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { PropsWithChildren } from "react";

export default function PanelNav({ children }: PropsWithChildren) {
  return <div className="w-full flex bg-[#559CDA] gap-1 py-2 px-4">{children}</div>;
}
