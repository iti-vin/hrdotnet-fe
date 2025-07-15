import { Stack } from "@mantine/core";
import { PropsWithChildren, forwardRef } from "react";

export const PrintableWrapper = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => (
  <Stack ref={ref} className="print-container">
    {children}
  </Stack>
));
