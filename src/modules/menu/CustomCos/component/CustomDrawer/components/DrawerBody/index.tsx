import { ReactNode } from "react";

export const DrawerBody = ({ children }: { children: ReactNode }) => (
  <div className="flex-1 overflow-auto">{children}</div>
);
