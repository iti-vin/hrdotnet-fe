import { PropsWithChildren } from "react";

export default function PanelTabContainer({ children }: PropsWithChildren) {
  return <div className=" w-full flex bg-[#559CDA] gap-1 py-2 pl-5 justify-start">{children}</div>;
}
