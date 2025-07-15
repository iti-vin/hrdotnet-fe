import { Stack } from "@mantine/core";
import { PropsWithChildren } from "react";
export default function index({ children }: PropsWithChildren) {
  return (
    <Stack className="w-full h-full" pos="relative">
      {children}
    </Stack>
  );
}
